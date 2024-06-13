<script lang="ts">
    import { qrPrefixes } from "$lib/utils/qr.js";

    let formData = {
        string_to_encode: "",
        prefix_id: 0
    };

    let fetchedQrDataString: string;

    const onSubmit = async (event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/qr/generate', {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status !== 201) throw new Error(`Server error occured: ${response.status} ${response.statusText}`);
            const { qrDataString } = await response.json();
            fetchedQrDataString = qrDataString;
        } catch (err) {
            console.error(err);
        }
    }
</script>

<svelte:head>
    <title>QR Generator | Jelani Alexis</title>
</svelte:head>

<div class="w-full min-h-screen flex flex-col justify-center items-center text-center gap-6 py-12">
    <div class="flex flex-col items-center">
        <h1 class="text-6xl">QR Generator</h1>
        <sub class="text-xl">Created by Jelani Alexis</sub>
    </div>

    {#if fetchedQrDataString}
        <div class="m-4 p-4 bg-neutral flex flex-col items-center gap-4">
            <h2 class="text-neutral-content text-xl font-bold">Here's your QR Code.</h2>
            <img src={fetchedQrDataString} alt="The generated QR code.">
            <a class="btn-lg btn btn-primary text-primary-content" href={fetchedQrDataString} download={`qr-by-jelani-${new Date(Date.now()).toUTCString()}`}>Download QR Code</a>
        </div>
    {/if}

    <form class="w-full flex flex-col items-center gap-4 text-gray-200" on:submit={onSubmit}>
        <select bind:value={formData.prefix_id} class={`h-12 border ${formData.prefix_id == 0 ? "border-primary": "border-neutral"} bg-transparent px-3 outline outline-0 rounded-md`}>
            <option class="bg-neutral" selected value={0}>Select a prefix (optional):</option>
            <option class="bg-neutral" value={1}>URL (https://)</option>
            <option class="bg-neutral" value={2}>Email Address (mailto:)</option>
            <option class="bg-neutral" value={3}>Phone Number (tel:)</option>
            <option class="bg-neutral" value={4}>SMS (sms:)</option>
            <option class="bg-neutral" value={5}>Coordinates (geo:)</option>
        </select>
        <label class="text-lg" for="string-to-encode">Text to encode:</label>
        <div class={`join w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 textarea p-0 ${formData.string_to_encode == "" ? "textarea-primary" : "border-neutral"} text-center`}>
            <div class="join-item w-3/12 sm:w-1/12 bg-neutral flex items-start py-3 justify-center text-sm">
                <p class="text-neutral-content">{qrPrefixes[formData.prefix_id] }</p>
            </div>
            <textarea class="join-item w-9/12 sm:w-11/12 h-full textarea focus:!outline-none focus:!border-none" name="string_to_encode" id="string-to-encode" required placeholder="Type here..." rows="1" bind:value={formData.string_to_encode}  />
        </div>
        <button class={`btn-lg btn ${formData.string_to_encode == "" ? "btn-disabled" : "btn-primary"}`} type="submit">Generate Code</button>
    </form>
</div>  