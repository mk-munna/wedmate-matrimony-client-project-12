import React from 'react';
import { FaHourglassStart } from 'react-icons/fa';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { useTheme } from '../Provider/ThemeProvider';

const HowItWorks = () => {
    const { theme } = useTheme();
    console.log(theme)
    return (
        <div className='pt-24'>
            <div>
                <h1 className='text-center text-heading text-5xl dark:text-heading2'>How It Works</h1>
            </div>
            <div>
                <VerticalTimeline className='before:!bg-primary'>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work "
                        contentStyle={{ background: '#ECF0F2', color: '' }}
                        contentArrowStyle={{ borderRight: '10px solid  #1B7261' }}
                        date="TIMING: 7:00 PM"
                        dateClassName={"text-heading dark:text-heading2"}
                        iconStyle={{ background: '#1B7261', color: '#fff' }}
                        icon={<FaHourglassStart />}
                    >
                        <h3 className=" text-3xl text-heading dark:text-heading2">Register</h3>
                        <p>
                            Begin by creating an account on our platform. Fill out your profile details, including personal information and interests. This helps us match you with the most relevant profiles.
                        </p>
                    </VerticalTimelineElement>
                </VerticalTimeline>
            </div>
        </div>
    );
};

export default HowItWorks;