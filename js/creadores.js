$(document).ready(function () {
    $.ajax({
        url: 'https://680bcc5a2ea307e081d25cf3.mockapi.io/Catedra', // cambia por tu URL real
        method: 'GET',
        dataType: 'json',
        success: function (sections) {
            const container = $("#sections-container");
            container.empty(); // Por si se recarga

            sections.forEach(section => {
                const card = $('<div>').addClass("card-creator");

                const img = $('<img>')
                    .attr("src", section.image1Src || "/placeholder.svg")
                    .attr("alt", `Imagen de ${section.title1}`);

                const overlay = $('<div>')
                    .addClass("hover-overlay")
                    .text(section.title1);

                card.append(img, overlay);
                container.append(card);
            });
        },
        error: function () {
            alert("Error al cargar los datos de los creadores.");
        }
    });
});