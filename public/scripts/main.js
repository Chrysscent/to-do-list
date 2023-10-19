const date = new Date().getDate();

$(document).ready(function () {
    $("input:checkbox").on("change", function () {
        const parentElement = $(this).parent();
        parentElement.toggleClass('completed');
    });

    $(".calendar-img").attr("src", `/icons/today-icons/calendar-simple-${date}-svgrepo-com.svg`);
});