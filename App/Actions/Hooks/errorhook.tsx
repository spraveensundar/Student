
import { useEffect } from "react";
import useCustomHooks from "./customhook";

const useApiError = (error: any, duration?: number) => {
    const { failuretoast } = useCustomHooks();
    useEffect(() => {
        console.log("API Error:", error);
        if (error?.data?.message) {
            console.log("API Error:", error);
            if (duration) {
                failuretoast("Error!", error.data.message, duration);
            }
            else {
                failuretoast("Error!", error.data.message);
            }
        }
        else if (error?.data?.errors) {
            const firstError = Object.values(error?.data?.errors)[0];
            console.log(firstError, "firstError");
            failuretoast("Error!", firstError);

        }
    }, [error]);
};

export default useApiError;



