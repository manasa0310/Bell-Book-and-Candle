const MembershipCard = ({ duration, isPhysical, selected, onSelect }) => {
  const pricing = {
    Monthly: { physical: 999, digital: 599 },
    Quarterly: { physical: 2849, digital: 1649 },
    'Half-yearly': { physical: 5549, digital: 3149 },
    Yearly: { physical: 10949, digital: 6149 },
  };

  const benefits = {
    Monthly: {
      physical: [
        'Physical book delivery (1 book)',
        'One online & offline meeting',
        'Book club kit with bookmarks, certificate, reading log, printouts',
        'Interactive sessions (Author meet, DIY, Music)',
        'Optional book merchandise & discussions',
        'Book & gift swap at meetings',
        'Birthday month surprises',
        'Exclusive online group for discussions',
        'Bookish trips (2 per year)',
      ],
      digital: [
        'Digital book copy',
        'Online group access',
        'Digital newsletters',
      ],
    },
    Quarterly: {
      physical: [
        'Physical book delivery (3 books)',
        '6+ meetings (online & offline)',
        'Enhanced book club kit with rewards tracker',
        'Monthly special sessions',
        'Optional book merchandise & discussions',
        'Book & gift swap at meetings',
        'Birthday surprises',
        'Exclusive online group access',
        'Bookish trips (2 per year)',
      ],
      digital: [
        'Digital book copies (3 books)',
        'Online group access',
        'Digital newsletters',
      ],
    },
    'Half-yearly': {
      physical: [
        'Physical book delivery (6 books)',
        '12+ meetings (online & offline)',
        'Comprehensive book club kit',
        'Monthly interactive sessions',
        'Optional book merchandise & discussions',
        'Book & gift swap at meetings',
        'Birthday surprises',
        'Exclusive online group access',
        'Bookish trips (2 per year)',
      ],
      digital: [
        'Digital book copies (6 books)',
        'Online group access',
        'Digital newsletters',
      ],
    },
    Yearly: {
      physical: [
        'Physical book delivery (12 books)',
        '24+ meetings (online & offline)',
        'Comprehensive book club kit',
        'Monthly interactive sessions',
        'Optional book merchandise & discussions',
        'Book & gift swap at meetings',
        'Birthday surprises',
        'Exclusive online group access',
        'Bookish trips (2 per year)',
      ],
      digital: [
        'Digital book copies (12 books)',
        'Online group access',
        'Digital newsletters',
      ],
    },
  };

  const durationInMonths =
    duration == 'Monthly'
      ? 1
      : duration == 'Quarterly'
      ? 3
      : duration == 'Half-yearly'
      ? 6
      : 12;
  const price = isPhysical
    ? pricing[duration].physical
    : pricing[duration].digital;
  const monthlyCost = Math.round(price / durationInMonths);
  const planTypeLabel = isPhysical
    ? 'Paperback Subscription'
    : 'Digital Subscription';
  const planBenefits = isPhysical
    ? benefits[duration].physical
    : benefits[duration].digital;

  return (
    <div
      className={`flex bg-white flex-col w-full max-w-[21rem] h-full mx-auto overflow-hidden rounded-lg transition duration-300 ease-in-out ${
        selected
          ? '  border-[#395E8F] border-4 shadow-lg'
          : ' border border-gray-200 hover:shadow-md'
      }`}>
      <div className="flex flex-col justify-between flex-grow p-4 sm:p-6">
        <div className="text-center">
          <h3
            className={`text-xl sm:text-2xl font-semibold my-3 sm:my-4 ${
              selected ? 'text-[#395E8F]' : 'text-black'
            }`}>
            {planTypeLabel} <br /> {duration}
          </h3>
          <p className="text-sm sm:text-md font-light mb-4 sm:mb-6 text-gray-600">
            {isPhysical
              ? 'Ideal for paperback aficionados'
              : 'Perfect for digital reading enthusiasts.'}
          </p>
        </div>
        <div className="text-center mb-4">
          <span
            className={`text-3xl sm:text-4xl font-bold ${
              selected ? 'text-[#395E8F]' : 'text-black'
            }`}>
            ₹{price}
          </span>
        </div>
        <div className="text-center mb-8">
          <span
            className={`text-md sm:text-lg font-medium ${
              selected ? 'text-[#395E8F]' : 'text-gray-600'
            }`}>
            (₹{monthlyCost}/month)
          </span>
        </div>
        <div className="flex-grow overflow-auto">
          <ul role="list" className="space-y-3 text-left mb-8">
            {planBenefits?.map((benefit, index) => (
              <li key={index} className="flex items-center">
                <svg
                  className={`w-5 h-5 mr-2 text-green-500 flex-shrink-0`}
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"></path>
                </svg>
                <span className={`text-sm font-normal text-accent-5`}>
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-auto">
          <button
            onClick={onSelect}
            className={`w-full font-semibold rounded-lg text-sm px-5 py-2 border-2 border-[#395E8F] text-center transition-all hover:scale-105 text-white duration-300 ease-in-out ${
              selected ? 'bg-[#395E8F] ' : ' bg-[#395E8F]  '
            }`}>
            {selected ? 'Plan Selected' : 'Get Started'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MembershipCard;
