import React from 'react';

const ContactSection = () => {
    return (
        <>
            <div className="py-36 space-y-5">
                <h1 className="text-4xl italic text-center">"Let’s Save Lives Together"</h1>
                <h1 className="text-4xl italic text-center">
                    "You don’t need a cape to be a hero — just roll up <br /> your sleeve and donate blood today."
                </h1>
            </div>

            <div>
                <section
                    className="h-[65vh] bg-fixed bg-center bg-cover flex justify-center items-center"
                    style={{ backgroundImage: "url('/assets/appointment_female_bg.webp')" }}
                >
                    <div className="text-center px-4">
                        <h1 className="text-black text-5xl italic">Give Blood, Give Hope</h1>
                        <div className="border-b w-4/5 border-white my-5 mx-auto"></div>
                        <p className="text-black text-xl">
                            Your donation matters. Help hospitals, emergency services, <br />
                            and people in crisis by giving the gift that flows from the heart.
                        </p>
                    </div>
                </section>
            </div>
        </>
    );
};

export default ContactSection;