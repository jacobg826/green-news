import React from 'react'
import './About.css'
import coast from './images/Oregon+coast2.jpg'


function About () {
    return (
        <div className="page-layout">
            <div className="header">
                <div className="text-background">
                    <h1 className="head-text">ITS ABOUT SAVING THE EARTH.</h1>
                </div>
            </div>
            <img src={coast} className="coast"/>
            <div className="text-body">
                <h1 className='about-text'>
                    Earth news is a news aggregator site designed to curate relevant and recent articles
                    pertaining to climate change and the environment.    
                </h1>
            </div>
            <div className="text-body">
                <h1 className="about-text">
                    Our goal is to inform people of the 
                    effects climate change has on our planet and to encourage readers to live sustainably 
                    and to hold corporations responsible for their effects on the environment.
                </h1>
            </div>

            <div className='red-section'>
                <h1 className="red-text">90 companies are responsible for two-thirds of greenhouse gas emissions</h1>
                <h1 className="red-text">Lets change that.</h1>
            </div>
        </div>
    )
}

export default About