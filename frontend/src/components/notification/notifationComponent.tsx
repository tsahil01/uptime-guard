import { IconBrandTelegram } from "@tabler/icons-react";

export function Notificaiton() {
    return (
        <div className="flex flex-row p-4 justify-start items-center w-full max-w-md mx-auto rounded-full bg-white shadow-lg text-black">
            <IconBrandTelegram className="w-8 h-8 my-auto" />
            <div className="flex flex-col ml-4">
                <p className="text-sm font-semibold">Telegram</p>
                <p className="text-xs">
                    Your website is down.
                </p>
            </div>
        </div>
    )
}
