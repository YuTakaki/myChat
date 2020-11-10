const getUserID = (req, res) => {
    res.send(req.params.id);
}

module.exports = {
    getUserID
}