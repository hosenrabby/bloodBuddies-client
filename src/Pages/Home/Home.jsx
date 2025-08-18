import React from 'react';
import Banner from './Banner';
import KeyFeatures from './KeyFeatured';
import GetAppointment from './GetAppoinment';
import ContactSection from './contactSection';
import ContactForm from './GetAppoinment';
import WhoWeR from './WhoWeR';
import DonationProcess from './DonationProcess';

const Home = () => {
    return (
        <>
            <Banner></Banner>
            <WhoWeR></WhoWeR>
            <KeyFeatures></KeyFeatures>
            <DonationProcess></DonationProcess>
            <ContactSection></ContactSection>
            <ContactForm></ContactForm>
        </>
    );
};

export default Home;