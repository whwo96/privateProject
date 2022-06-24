const customLoading = {
    start: function () {
        const newCustomLoadingModal = document.createElement("div");
        newCustomLoadingModal.setAttribute("class", "customLoadingModal");
        const newCustomLoading = document.createElement("div");
        newCustomLoading.setAttribute("class", "customLoading");
        newCustomLoadingModal.appendChild(newCustomLoading);
        document.body.classList.add("customLoadingBlock");
        document.body.insertAdjacentElement("afterend", newCustomLoadingModal);
    },

    end: function () {
        document.body.classList.remove("customLoadingBlock");
        if(document.querySelector(".customLoadingModal")) {
            document.querySelector(".customLoadingModal").remove();
        }
    }
}
