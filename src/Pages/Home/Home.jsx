import React from 'react';
import Banner from './Banner';
import KeyFeatures from './KeyFeatured';
import GetAppointment from './GetAppoinment';
import ContactSection from './contactSection';
import ContactForm from './GetAppoinment';

const Home = () => {
    return (
        <>
            <Banner></Banner>
            <KeyFeatures></KeyFeatures>
            <ContactSection></ContactSection>
            <ContactForm></ContactForm>
        </>
    );
};

export default Home;