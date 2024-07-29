/** @jsxImportSource preact */
import { h } from 'preact';
import { useSignal, useComputed } from '@preact/signals';
import { userData } from "../state/user-state.ts";

export default function DrinkTimer() {
    const oz = useSignal('');
    const alcoholPercentage = useSignal('');
    const drinks = useSignal<{oz: number, percentage: number, time: Date}[]>([]);
    const updateTrigger = useSignal(0);

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        drinks.value = [...drinks.value, {
            oz: parseFloat(oz.value),
            percentage: parseFloat(alcoholPercentage.value),
            time: new Date()
        }];
        oz.value = '';
        alcoholPercentage.value = '';
        updateTrigger.value += 1;
    };

    const bac = useComputed(() => {
        updateTrigger.value; // Ensures re-computation when drinks or user data changes
        if (!userData.value || drinks.value.length === 0) return 0;

        const weight = parseFloat(userData.value.weight);
        const height = parseFloat(userData.value.height);
        const gender = userData.value.gender;
        const ethnicity = userData.value.ethnicity;

        // Calculate total alcohol consumed (in grams)
        const totalAlcohol = drinks.value.reduce((sum, drink) => {
            return sum + (drink.oz * drink.percentage / 100 * 29.5735); // Convert oz to ml, then to grams of alcohol
        }, 0);

        // Calculate body water constant based on gender and ethnicity
        let bodyWater;
        if (gender === 'male') {
            bodyWater = 0.58;
            if (ethnicity === 'asian') bodyWater -= 0.02;
        } else {
            bodyWater = 0.49;
            if (ethnicity === 'asian') bodyWater -= 0.02;
        }

        // Calculate BMI
        const bmi = (weight * 0.453592) / ((height * 0.0254) ** 2);

        // Adjust body water based on BMI
        if (bmi > 30) {
            bodyWater -= 0.02;
        } else if (bmi < 18.5) {
            bodyWater += 0.02;
        }

        // Calculate BAC
        let bac = (totalAlcohol / (weight * 453.592 * bodyWater)) * 100;

        // Account for time passed (alcohol metabolism)
        const currentTime = new Date();
        const hoursPassed = (currentTime.getTime() - drinks.value[0].time.getTime()) / (1000 * 60 * 60);

        // Adjust metabolism rate based on ethnicity
        let metabolismRate = 0.015;
        if (ethnicity === 'asian') {
            metabolismRate *= 0.9; // Slower metabolism for Asian individuals
        }

        bac -= metabolismRate * hoursPassed;

        return Math.max(0, bac); // BAC can't be negative
    });

    return (
        <div class="px-4 py-8 mx-auto bg-[#86efac] min-h-screen flex flex-col items-center justify-center">
            <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center text-center">
                <h1 class="text-4xl font-bold mb-6">Drink Timer</h1>
                <form class="w-full max-w-lg mb-6" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="oz">
                            Drink Size (oz)
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="oz"
                            type="number"
                            step="1"
                            value={oz.value}
                            onInput={(e) => oz.value = (e.target as HTMLInputElement).value}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="alcoholPercentage">
                            Alcohol Percentage
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="alcoholPercentage"
                            type="number"
                            step="0.1"
                            value={alcoholPercentage.value}
                            onInput={(e) => alcoholPercentage.value = (e.target as HTMLInputElement).value}
                            required
                        />
                    </div>
                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Add Drink
                    </button>
                </form>
                <div class="text-2xl font-bold">
                    Current BAC: {bac.value.toFixed(3)}%
                    <p>wow {userData.value.weight}</p>
                </div>
                <div class="mt-6">
                    <h2 class="text-2xl font-bold mb-2">Drinks Consumed:</h2>
                    <ul>
                        {drinks.value.map((drink, index) => (
                            <li key={index}>
                                {drink.oz} oz at {drink.percentage}% - {drink.time.toLocaleTimeString()}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
