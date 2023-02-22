const GoogleSheetsService = require('../googleApi/GoogleSheetsService');

module.exports = {
    async getSheets(req, res) {
        try {
            const { sheets } = await GoogleSheetsService.authentication();

            const response = await sheets.spreadsheets.values.get({
                spreadsheetId: GoogleSheetsService.sheetsID,
                range: 'Sheet1',
            })
            res.send(response.data);
            console.log(response.data);

        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    },
    async postData(req, res) {
        try {
            let reqBody = req.body;

            let data = [[
                reqBody.firstname,
                reqBody.lastname,
                reqBody.email,
                reqBody.number,
                reqBody.designation,
                reqBody.zone,
                reqBody.region,
                reqBody.area,
                reqBody.branch,
                reqBody.location.latitude,
                reqBody.location.longitude
            ]];
            console.log(data);
            
            const { sheets } = await GoogleSheetsService.authentication();

            let request = {
                spreadsheetId: GoogleSheetsService.sheetsID,
                range: 'Sheet1!A2',
                valueInputOption: 'RAW',
                resource: {
                    values: data
                }
            }
            const response = await sheets.spreadsheets.values.append(request).data

            res.send(response)
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
}