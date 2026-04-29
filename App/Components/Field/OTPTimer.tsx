import React, { useEffect, useState } from 'react';
import Text from '../text';

type Props = {
    label?: string
    duration?: number;
    onExpire?: () => void;
};

const OtpTimer: React.FC<Props> = ({ label, duration = 300, onExpire }) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    onExpire?.();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <Text>
            {label}
            {timeLeft > 0 ? `${minutes.toString().padStart(2, '0')}m:${seconds.toString().padStart(2, '0')}s` : ''}
        </Text>
    );
};

export default OtpTimer;