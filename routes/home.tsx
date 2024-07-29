/** @jsxImportSource preact */

import { h } from 'preact';

export default function Home() {
    return (
        <div class="px-4 py-8 mx-auto bg-[#86efac] min-h-screen flex flex-col items-center justify-center">
            <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center text-center">
                <img
                    class="my-6"
                    src="/logo.svg"
                    width="128"
                    height="128"
                    alt="Sip Schedule logo"
                />
                <h1 class="text-4xl font-bold">Welcome to Sip Schedule</h1>
                <p class="my-4">
                    Track your drinks and know when you'll be sober. Start tracking now or learn more about how it works.
                </p>
                <div class="my-6">
                    <a className="px-4 py-2 bg-blue-500 text-white rounded-md mx-2 hover:bg-blue-700" href="/user-data">
                        Start
                    </a>
                    <button class="px-4 py-2 bg-gray-500 text-white rounded-md mx-2 hover:bg-gray-700"
                            onclick={() => window.location.href = '/how-it-works'}>
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    );
}
