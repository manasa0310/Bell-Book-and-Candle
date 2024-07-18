'use client';
import React, { useState, useEffect, useRef } from 'react';
import MembershipCard from '@/components/MembershipCard';
import ToggleButton from '@/components/ToggleButton';
import { useLoading } from '@/contexts/LoadingContext';
import Loader from '@/components/Loader';
import AOS from 'aos';
import { useUser } from '@/contexts/UserContext';
import SignInModal from '@/components/SignInModal';
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';

const pricing = {
  Monthly: { physical: 999, digital: 599 },
  Quarterly: { physical: 2849, digital: 1649 },
  'Half-yearly': { physical: 5549, digital: 3149 },
  Yearly: { physical: 10949, digital: 6149 },
};

const MembershipPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isPhysicalCopy, setIsPhysicalCopy] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoading } = useLoading();
  const { user, handleSignInWithGoogle, handleLogout, setUser } = useUser();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const paymentSectionRef = useRef(null);

  const signInAndRedirect = async () => {
    await handleSignInWithGoogle();
    setIsModalOpen(false);
  };

  const toggleCopyType = () => {
    setIsPhysicalCopy(!isPhysicalCopy);
  };

  const handleSelectPlan = (plan) => {
    if (plan == selectedPlan) {
      setSelectedPlan(null);
    } else {
      setSelectedPlan(plan);
      // Scroll to the payment section
      paymentSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const calculateTotal = () => {
    if (!selectedPlan) return 0;
    const copyType = isPhysicalCopy ? 'physical' : 'digital';
    return pricing[selectedPlan][copyType];
  };

  const calculateExpiryDate = (selectedPlan) => {
    const now = new Date();
    switch (selectedPlan) {
      case 'Monthly':
        return new Date(now.setMonth(now.getMonth() + 1));
      case 'Quarterly':
        return new Date(now.setMonth(now.getMonth() + 3));
      case 'Half-yearly':
        return new Date(now.setMonth(now.getMonth() + 6));
      case 'Yearly':
        return new Date(now.setFullYear(now.getFullYear() + 1));
      default:
        throw new Error('Invalid plan selected');
    }
  };

  const updateMembershipStatus = async () => {
    const userRef = doc(db, 'users', user.id);
    const expiryDate = calculateExpiryDate(selectedPlan);

    // Create a plan object to store in Firestore
    const planDetails = {
      duration: selectedPlan,
      type: isPhysicalCopy ? 'physical' : 'digital',
      startDate: new Date(),
      expiryDate: expiryDate,
    };

    try {
      await updateDoc(userRef, {
        planChoosed: planDetails,
        isPaidMember: true,
        planExpiryDate: expiryDate,
        previousPlans: arrayUnion(planDetails),
      });

      // Fetch the updated user data
      const updatedUserSnap = await getDoc(userRef);
      if (updatedUserSnap.exists()) {
        console.log('User data updated successfully:', updatedUserSnap.data());
        const updatedUserData = updatedUserSnap.data();
        setUser(updatedUserData);
        localStorage.setItem('user', JSON.stringify(updatedUserData));
      }
      setPaymentSuccess(true);
    } catch (error) {
      console.error("Failed to update the user's membership status:", error);
    }
  };

  const makePayment = async () => {
    try {
      const key = process.env.NEXT_PUBLIC_RAZORPAY_API_KEY;
      if (!key) {
        console.error('Razorpay API key is missing');
        return;
      }

      const amount = calculateTotal();

      const paymentData = {
        amount: amount,
        userId: user?.id,
        userEmail: user?.email,
        userName: user?.name,
        membership: `${selectedPlan} - ${
          isPhysicalCopy ? 'Paperback' : 'Digital'
        }`,
      };

      const response = await fetch('/api/razorpay/paymentcreate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }

      if (response.ok) {
        updateMembershipStatus(selectedPlan);
      }

      const data = await response.json();
      if (!data.order) {
        throw new Error('Order details are missing in the response');
      }

      const { order } = data;

      const options = {
        key,
        name: 'Bell Book and Candle',
        currency: order.currency,
        amount: order.amount,
        order_id: order.id,
        description: 'Understanding RazorPay Integration',
        handler: async (response) => {
          try {
            const verificationResponse = await fetch(
              '/api/razorpay/paymentverify',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              }
            );

            if (!verificationResponse.ok) {
              throw new Error(
                `Verification API call failed with status: ${verificationResponse.status}`
              );
            }

            const verificationData = await verificationResponse.json();
            console.log('verificationResponse==', verificationData);
            if (verificationData.success) {
              updateMembershipStatus(selectedPlan);
            }
          } catch (verifyError) {
            console.error('Payment verification failed', verifyError);
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: '9445543026',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      paymentObject.on('payment.failed', function (response) {
        alert(
          `Payment failed. Reason: ${response.error.description}. Please try again or contact support for help.`
        );
      });
    } catch (error) {
      console.error('Payment initiation failed', error);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    if (
      user?.isPaidMember &&
      new Date(user.planExpiryDate).getTime() > Date.now()
    ) {
      alert(
        `You are already a member, and your membership expires on ${new Date(
          user.planExpiryDate
        ).toLocaleDateString()}.`
      );
    }
  }, [user, user?.isPaidMember, user?.planExpiryDate]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="mt-20 p-8 mx-auto max-w-4xl">
      <header class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
        <h2 className="mb-5 inline-flex border-2 border-black bg-white px-5 py-3 font-extrabold uppercase leading-none text-black shadow-[4px_4px_0_#08111F] ">
          Membership
        </h2>
        <h3 className="text-3xl font-extrabold text-black  lg:text-[40px] lg:leading-[60px]">
          Our Book Club Membership Plans
        </h3>
        <p className="lg:text-lg">
          Discover a tier that fits your reading style. Engage with stories,
          connect with fellow enthusiasts, and enjoy a curated literary
          experience.
        </p>
      </header>

      <div className="flex gap-4 items-center justify-center ">
        <div
          className={`w-fit px-1 text-base font-medium text-black transition-all duration-300 ease-linear flex-shrink-0`}>
          <span className={`${isPhysicalCopy ? 'font-normal' : 'font-bold'}`}>
            Digital
          </span>
        </div>
        <ToggleButton
          isPhysical={isPhysicalCopy}
          toggleCopyType={toggleCopyType}
        />
        <div
          className={`w-fit px-1 text-base font-medium text-black transition-all duration-300 ease-linear flex-shrink-0`}>
          <span className={`${!isPhysicalCopy ? 'font-normal' : 'font-bold'}`}>
            Paperback
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 w-fit mx-auto">
        {['Monthly', 'Quarterly', 'Half-yearly', 'Yearly'].map((duration) => (
          <MembershipCard
            key={duration}
            duration={duration}
            isPhysical={isPhysicalCopy} // Pass the state here
            selected={selectedPlan === duration}
            onSelect={() => handleSelectPlan(duration)}
          />
        ))}
      </div>

      <div
        style={{ scrollMarginTop: '6rem' }}
        ref={paymentSectionRef}
        className="mt-20 md:p-8 mx-auto max-w-sm md:max-w-4xl flex flex-col  md:flex-row space-y-8 md:space-y-0 md:space-x-8">
        {user ? (
          <>
            {!user.isPaidMember ? (
              <>
                <div className="flex-1 bg-white p-6 rounded-lg shadow border border-gray-200">
                  <div className="flex gap-4 items-center justify-center mb-6">
                    <div
                      className={`w-fit px-1 text-base font-medium text-black transition-all duration-300 ease-linear flex-shrink-0`}>
                      <span
                        className={`${
                          isPhysicalCopy ? 'font-normal' : 'font-bold'
                        }`}>
                        Digital
                      </span>
                    </div>
                    <ToggleButton
                      isPhysical={isPhysicalCopy}
                      toggleCopyType={toggleCopyType}
                    />
                    <div
                      className={`w-fit px-1 text-base font-medium text-black transition-all duration-300 ease-linear flex-shrink-0`}>
                      <span
                        className={`${
                          !isPhysicalCopy ? 'font-normal' : 'font-bold'
                        }`}>
                        Paperback
                      </span>
                    </div>
                  </div>
                  {Object.keys(pricing).length > 0 ? (
                    <div className="space-y-4">
                      {Object.keys(pricing).map((plan) => (
                        <div
                          key={plan}
                          className={`flex items-center cursor-pointer p-4 border rounded-lg transition-shadow duration-200 ease-in-out
                        ${
                          selectedPlan === plan
                            ? 'border-secondary bg-primary/50 shadow-sm text-black'
                            : 'border-gray hover:shadow-lg'
                        }`}
                          onClick={() => handleSelectPlan(plan)}>
                          <input
                            type="checkbox"
                            checked={selectedPlan === plan}
                            onChange={() => handleSelectPlan(plan)}
                            className="sr-only"
                          />
                          <div
                            className={`flex-shrink-0 w-7 h-7 flex justify-center items-center mr-3 rounded-full border-2
                          ${
                            selectedPlan === plan
                              ? 'border-secondary bg-secondary'
                              : 'border-gray bg-white'
                          }
                          transition-all duration-200 ease-in-out`}>
                            {selectedPlan === plan && (
                              <svg
                                className="w-5 h-5 text-white"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path d="M5 13l4 4L19 7"></path>
                              </svg>
                            )}
                          </div>
                          <span className="flex-grow text-base font-medium text-gray-800">
                            {`${plan} Membership ${
                              isPhysicalCopy ? '(Paperback)' : '(Digital)'
                            }`}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-lg font-medium text-gray-800 italic">
                        Select a plan to become a member.
                      </p>
                    </div>
                  )}
                </div>
                <div className="w-full flex-1 relative md:px-4 lg:px-0">
                  <div className="sticky top-24 lg:top-32 bottom-0 p-6 rounded-lg shadow-lg border border-gray bg-white max-h-screen overflow-auto text-black">
                    {selectedPlan ? (
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 ">
                          Summary
                        </h2>
                        <ul className="space-y-4 mb-6">
                          <li className="text-lg text-gray-800">
                            <span className="font-semibold">
                              Selected Plan:
                            </span>{' '}
                            {`${selectedPlan} - ${
                              isPhysicalCopy ? 'Paperback' : 'Digital'
                            }`}
                          </li>
                          <li className="text-lg text-gray-800">
                            <span className="font-semibold">Total Cost:</span> ₹
                            {calculateTotal()}
                          </li>
                        </ul>
                        <button
                          onClick={() => makePayment()}
                          className="w-full px-6 py-3 bg-secondary text-white rounded-md font-semibold text-lg hover:scale-105 hover:shadow-md transition-all duration-300 ease-in-out">
                          Pay Now
                        </button>
                      </div>
                    ) : (
                      <div className="text-center text-gray">
                        <p className="text-xl font-medium ">
                          No plan selected.
                        </p>
                        <p className="mt-4 text-lg italic">
                          Choose a plan to view the summary and proceed with
                          payment.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 bg-white p-6 rounded-lg shadow border border-gray-200 text-center">
                <h2 className="text-2xl font-bold text-black mb-6 ">
                  Membership Details
                </h2>
                <p className="text-lg text-slate-900">
                  You are already a member, and your membership expires on{' '}
                  {user.planChoosed.expiryDate.seconds
                    ? new Date(
                        user.planChoosed.expiryDate.seconds * 1000
                      ).toLocaleDateString()
                    : 'Loading...'}
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center mt-10  items-center  bg-white mx-auto py-32 px-16 rounded-lg border border-gray flex flex-col gap-5">
            <button
              onClick={() => setIsModalOpen(true)} // Replace with your actual login function
              className="w-fit items-center justify-center gap-2.5 border-2 border-[#08111F] hover:border-[#395E8F] bg-white px-4 py-3 text-sm font-extrabold text-black hover:shadow-[4px_4px_0_#395E8F] duration-300 shadow-none">
              Log In to Become a Member
            </button>
            <p className="text-base text-gray mx-auto max-w-2xl">
              Immerse yourself in a community where literary adventures await at
              every turn. Unlock exclusive books, join lively discussions, and
              attend unique events. Your next favorite story is just a
              membership away.
            </p>
          </div>
        )}
      </div>

      <SignInModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSignInWithGoogle={signInAndRedirect}
      />
    </div>
  );
};

export default MembershipPage;
