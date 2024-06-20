import React, { useEffect, useRef } from 'react';
import { textTyping } from 'text-typing';

const TypingComponent = () => {
    const headingRef1 = useRef(null);

    useEffect(() => {
        const initializeTyping = async () => {
            const txt1 = textTyping(headingRef1.current);
            await txt1.typeText("내 자취생활의 길라잡이, ","KakaoSmall-Light").then(async () => {
            });
            // txt1.lineBreak();

            await txt1.typeText("자취연구소", "KakaoSmall-Bold").then(async () => {
                // await resp.sleep(1000); // 잠시 멈춤
            });
        };




        initializeTyping();
    }, []);

    return (
        <div>
            <h1 ref={headingRef1}></h1>
        </div>
    );
};

export default TypingComponent;
