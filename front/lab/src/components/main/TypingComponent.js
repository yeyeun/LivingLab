import React, { useEffect, useRef } from 'react';
import { textTyping } from 'text-typing';

const TypingComponent = () => {
    const headingRef = useRef(null);

    useEffect(() => {
        const initializeTyping = async () => {
            const txt1 = textTyping(headingRef.current);

            await txt1.typeText("자취연구소.", "main-title");
            txt1.lineBreak(); // 줄바꿈

            await txt1.typeText("내 자취생활의 길라잡이", "main-subtitle").then(async (resp) => {
                await resp.sleep(1000); 
            });
        };

        initializeTyping();
    }, []);

    return (
        <div className="">
            <div className="text-center">
                <h1 ref={headingRef}></h1>
            </div>
        </div>
    );
};

export default TypingComponent;
