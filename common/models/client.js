module.exports = function (Client) {
Client.remoteMethod(
    'getClientLike',
    {
        description : 'get name like -> Nama Client',
        accepts : [
                {arg : 'Nama Client', type : 'string'}
        ],
        returns : {
            arg : 'res', type : 'object', root : true
        },
        https: {path : 'getClientLike', verb : ' get'}

        }
    ),
    Client.getClientLike = function(nama , callback) {
        new Promise(function(resolve, reject){
            var filter = {
                where : {
                    nama : {
                        like : nama
                    }
                }
            }
            Client.find(filter, function(err, result){
                if (err) reject (err)
                if (result === null) {
                    err = new Error ('Cannot find that result')
                    err.statusCode = 404
                    reject (err)
                }

                resolve (result)
            })
        })
        .then(function(res){
            if (!res) callback (err)
            return callback (null, res)
        })
        .catch(function(err){
            callback (err);
        })
    }
};