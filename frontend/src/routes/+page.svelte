<script>
 let { data } = $props();

 let days = [...new Set(data.flights.map(flight => flight.day))];

 let flightsByDay = days.map(day => ({
     day,
     flights: data.flights.filter(flight => flight.day === day)
 }));
</script>

<main>
    {#each flightsByDay as { day, flights }}
        <h2>Scheduled flights for day {day}</h2>
        <div class="table-wrapper">
            <div class="table-header">
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
                    View Flight
                </div>
            </div>
                <section class="table-rows">
            {#each flights as {flight_number, departure_city, arrival_city}}
                    <div class="table-row">
                        <div>
                            {flight_number}
                        </div>
                        <div>
                            {departure_city}
                        </div>
                        <div>
                            {arrival_city}
                        </div>
                        <div>
                            <a href="{flight_number}">
                                view flight
                            </a>
                        </div>
                    </div>
            {/each}
                </section>
        </div>
    {/each}
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
     @apply grid grid-cols-4;
 }
 .table-rows {
     @apply border border-[#eee] p-4 rounded shadow-md;
 }

 .table-row {
     @apply grid grid-cols-4  mb-2 p-2 border-b border-gray-200;
 }

 .flight-item:last-child {
     @apply border-none; /* Remove border on the last item */
 }
</style>
