import { useState, useEffect } from "react";

interface OTPTimerHookProps {
  duration: number; // Duration in seconds
  onExpire?: () => void; // Optional callback when the timer expires
}

interface OTPTimerHookResult {
  timeLeft: string;
  otpExpired: boolean;
}

const useOTPTimer = ({
  duration,
  onExpire,
}: OTPTimerHookProps): OTPTimerHookResult => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [otpExpired, setOtpExpired] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setOtpExpired(true);
      if (onExpire) {
        onExpire();
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onExpire]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return {
    timeLeft: formatTime(timeLeft),
    otpExpired,
  };
};

export default useOTPTimer;
