<script lang="ts">
	import * as Select from '$lib/components/ui/select';
    const kmOptions = [
        { value: 5, label: '5 km' },
        { value: 10, label: '10 km' },
        { value: 20, label: '20 km' },
        { value: 50, label: '50 km' },
        { value: 100, label: '100 km' },
        { value: 200, label: '200 km' },
    ];
</script>

<Select.Root>
	<Select.Trigger class="w-[180px]">
		<Select.Value placeholder="Range" />
	</Select.Trigger>
	<Select.Content>
        {#each kmOptions as { value, label }}
            <Select.Item value={value}>{label}</Select.Item>
        {/each}
	</Select.Content>
</Select.Root>
