const DonationProcess = () => {
    const steps = [
        {
            id: 1,
            title: "REGISTRATION",
            desc: "You need to complete a very simple registration form. Which contains all required contact information to enter in the donation process.",
            img: "/assets/process_1.jpg", 
        },
        {
            id: 2,
            title: "DONATION REQUESTING",
            desc: "A drop of blood from your finger will be taken for a simple test to ensure that your blood iron levels are proper enough for the donation process.",
            img: "/assets/process_2.jpg", 
        },
        {
            id: 3,
            title: "DONATION",
            desc: "After passing the screening test successfully you will be directed to a donor bed for donation. It will take only 6-10 minutes.",
            img: "/assets/process_3.jpg", 
        },
    ];

    return (
        <section className="max-w-6xl mx-auto px-6 py-12 text-center">
            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold uppercase text-gray-700 mb-2">Donation Process</h2>
            <div className="w-16 h-1 bg-red-500 mx-auto mb-4"></div>
            <p className="text-gray-600 mb-10">
                The donation process from the time you arrive at the center until the time you leave
            </p>

            {/* Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {steps.map((step) => (
                    <div key={step.id} className="hover:shadow-lg hover:shadow-red-300 transition duration-200 transform hover:scale-[1.02] overflow-hidden bg-base-100">
                        {/* Image */}
                        <div className="relative">
                            <img src={step.img} alt={step.title} className="w-full h-56 object-cover" />
                            <div className="absolute bottom-0 right-0 bg-red-600 text-white px-4 py-2 text-xl font-bold">
                                {step.id}
                            </div>
                        </div>
                        {/* Text */}
                        <div className="p-6 text-left">
                            <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                            <p className="text-gray-600">{step.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default DonationProcess;
