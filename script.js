async function getapi() {
    try {
        let response = await fetch('https://api.data.gov.sg/v1/environment/psi');
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}
  
// Function to define innerHTML for HTML table
async function renderapi() {
    let retrievedData = await getapi();

    updateTimestamp = retrievedData.items[0].update_timestamp;
    datetime = new Date(updateTimestamp);
    $("#lastUpdated").text("Last Updated on "+datetime);

    keys = Object.keys(retrievedData.items[0].readings);
    psiData = retrievedData.items[0].readings;
    $tbody = $('#psiTable').find('tbody');

    keys.forEach(key => {
        $tbody.append("<tr><td>"+key+"</td><td>"+psiData[key].national+
            "</td><td>"+psiData[key].central+"</td><td>"+psiData[key].west+
                "</td><td>"+psiData[key].east+"</td><td>"+psiData[key].north+
                    "</td><td>"+psiData[key].south+"</td></tr>");
    });
}
renderapi();