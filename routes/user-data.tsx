/** @jsxImportSource preact */
import { h } from 'preact';
import { useSignal } from '@preact/signals';
import { userData } from "../state/user-state.ts";

export default function CollectUserData() {
    const weight = useSignal('');
    const height = useSignal('');
    const ethnicity = useSignal('');
    const gender = useSignal('');

    const handleSave = (e: Event) => {
        // Don't prevent default event so the form can be submitted
        userData.value = {
            weight: weight.value,
            height: height.value,
            ethnicity: ethnicity.value,
            gender: gender.value
        };
        console.log("Details saved:", userData.value);
    };

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        userData.value = {
            weight: weight.value,
            height: height.value,
            ethnicity: ethnicity.value,
            gender: gender.value
        };
        console.log("Form submitted:", userData.value);
        console.log("Navigating to drink-timer page");
    };

    return (
        <div class="px-4 py-8 mx-auto bg-[#86efac] min-h-screen flex flex-col items-center justify-center">
            <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center text-center">
                <h1 class="text-4xl font-bold mb-6">Enter Your Details</h1>
                <form class="w-full max-w-lg" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weight">
                            Weight (lbs)
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="weight"
                            type="number"
                            value={weight.value}
                            onInput={(e) => weight.value = e.target.value}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="height">
                            Height (in)
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="height"
                            type="number"
                            value={height.value}
                            onInput={(e) => height.value = e.target.value}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ethnicity">
                            Ethnicity
                        </label>
                        <select
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="ethnicity"
                            value={ethnicity.value}
                            onChange={(e) => ethnicity.value = e.target.value}
                            required
                        >
                            <option value="">Select your ethnicity</option>
                            <option value="asian">Asian</option>
                            <option value="black">Black</option>
                            <option value="hispanic">Hispanic</option>
                            <option value="white">White</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Gender
                        </label>
                        <div className="flex items-center space-x-16">
                            <div className="flex items-center">
                                <input
                                    className="mr-2 leading-tight"
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    value="male"
                                    checked={gender.value === 'male'}
                                    onChange={(e) => gender.value = e.target.value}
                                    required
                                />
                                <label className="text-gray-700" htmlFor="male">
                                    Male
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    className="mr-2 leading-tight"
                                    type="radio"
                                    id="female"
                                    name="gender"
                                    value="female"
                                    checked={gender.value === 'female'}
                                    onChange={(e) => gender.value = e.target.value}
                                    required
                                />
                                <label className="text-gray-700" htmlFor="female">
                                    Female
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <a
                            href={"/drink-timer"}
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={handleSubmit}
                        >
                            Submit
                        </a>
                        <button
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={handleSave}
                        >
                            Save Details
                        </button>
                        <p>{weight.value}</p>
                        <p>{userData.value.weight}</p>
                    </div>
                </form>
            </div>
        </div>
    );
}
