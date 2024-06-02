<script lang="ts">
    let formData = {
        string_to_encode: ""
    }

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

<div class="w-full min-h-screen flex flex-col justify-center items-center text-center gap-8">
    <div class="flex flex-col items-center">
        <h1 class="text-6xl">QR Generator</h1>
        <sub class="text-xl">Created by Jelani Alexis</sub>
    </div>

    {#if fetchedQrDataString}
        <div class="m-4 p-4 bg-gray-500 flex flex-col items-center gap-4">
            <h2 class="text-gray-900 text-xl font-bold">Here's your QR Code.</h2>
            <img src={fetchedQrDataString} alt="The generated QR code.">
        </div>
    {/if}

    <form class="w-full flex flex-col items-center gap-4 text-gray-200" on:submit={onSubmit}>
        <label class="text-lg" for="string-to-encode">Content to encode (max. 128 characters):</label>
        <input class="w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 input input-primary text-center outline-none" type="text" on:input={e => formData.string_to_encode = e.currentTarget.value} name="string_to_encode" id="string-to-encode" required maxlength="128"/>
        <button class="btn-lg btn" type="submit">Generate Code</button>
    </form>
</div>
