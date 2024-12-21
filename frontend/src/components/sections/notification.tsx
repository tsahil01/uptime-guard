
import { DeviceFrameset } from "react-device-frameset";
import 'react-device-frameset/styles/marvel-devices.min.css'
import { Notificaiton } from "../notification/notifationComponent";

export function NotificaitonSection() {
    return (
        <>
            <div className="flex flex-col bg-primary pt-20 lg:pt-0 text-white dark:text-black">

                <div className="text-center lg:hidden container">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">
                        Get real-time notifications on your telegram
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Get Up time & Down time notifications on your telegram when your website goes down or up.
                    </p>
                </div>

                <div className="w-full flex flex-col mx-auto items-center justify-center h-[40vh] container">
                    <div className="overflow-hidden mx-auto md:justify-around justify-center flex md:flex-row gap-4 w-full lg:p-10 lg:py-10 py-10 px-2">

                        <DeviceFrameset device="Samsung Galaxy S5" color="black">
                            <div className="w-full h-full flex flex-col gap-3 pt-5 bg-[url('/wall.png')] bg-cover bg-center px-6">
                                <Notificaiton />
                            </div>
                        </DeviceFrameset>

                        <div className="h-full flex-col gap-3 justify-center text-left max-w-md hidden lg:flex">
                            <h1 className="text-3xl font-bold ">
                                Get real-time notifications on your telegram
                            </h1>
                            <p className="">
                                Get Up time & Down time notifications on your telegram when your website goes down or up.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

