<script>
 let { data } = $props();
</script>

<main>
    <div class="table-wrapper">
        <div class="table-header">
            <div>
                Order
            </div>
            <div>
                Flight
            </div>
            <div>
                Departure
            </div>
            <div>
                Arrival
            </div>
            <div>
                Day
            </div>
        </div>
        <section class="table-rows">
            {#each data.orders as { orderID, departure, destination, flightNumber, day }}
                <div class="table-row">
                    <div>
                        {orderID}
                    </div>
                    <div>
                        {flightNumber}
                    </div>
                    <div>
                        {departure}
                    </div>
                    <div>
                        {destination}
                    </div>
                    <div>
                        {day}
                    </div>
                </div>
            {/each}
        </section>
    </div>
</main>

<style lang="postcss">
 main {
     @apply mx-auto p-[10%];
 }
 h2 {
     @apply text-sm font-bold mb-2;
 }
 .table-wrapper {
     @apply flex flex-col gap-4 mb-8 mt-4;
 }
 .table-header {
     @apply grid grid-cols-5;
 }
 .table-rows {
     @apply border border-[#eee] p-4 rounded shadow-md;
 }

 .table-row {
     @apply grid grid-cols-5 mb-2 p-2 border-b border-gray-200;
 }
</style>
