import { useSelector } from "react-redux";
import { constantData, Prettylog, SOCKET_URL } from "../../Common/constant"
import useSocket from "./sockethook"
import { authSliceSelector } from "../../Common/redux/authSliceReducer";
import { useCallback } from "react";

console.log(SOCKET_URL, "SOCKET_URLSOCKET_URLSOCKET_URL");

export const useGlobalsocket = () => {
    const { userDetail } = useSelector(authSliceSelector)
    const userId = userDetail?._id;
    Prettylog(userDetail)


    const events: any = {
        [constantData.socketEvents.userDetailFetched]: useCallback((data: any) => {
        }, []),
    }
    const { isConnected } = useSocket({
        events: events,
        autoConnect: !!userId,
        url: SOCKET_URL,
        options: userId
            ? {
                query: { userId },
            }
            : undefined,
    })

    return isConnected
}

export const socketkets = {
    emitprofile: constantData.socketEvents.userGetMyDetail
}





const useSocketemithook = () => {

    const { emit } = useSocket()
    const emitprofile = () => emit(socketkets.emitprofile)

    return {
        emitprofile
    };
}

export default useSocketemithook;