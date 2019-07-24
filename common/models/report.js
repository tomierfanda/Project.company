var app = require('../../server/server')
module.exports = function(Report) {
    Report.remoteMethod(
        'getNameReport',
        {
            description : 'get name like -> keteragan',
            accepts : [
                {arg : 'barang', type : 'string'}
            ],
            returns : {
                arg: 'res', type : 'object', root : true
            },
            https: {path : 'getNameLike', verb: 'get'}
        }
    );
        Report.getNameReport = function(id , callback) {
            new Promise(function(resolve, reject){
                var filter = {
                    where : {
                        id : {
                            like : id
                        }
                    }
                }
            
                Report.find(filter, function(err, result){
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
                var client = app.models.Client

                var id = res[0].id
                
                var filter = {
                    where : {
                        id : id
                    }
                }
                client.find(filter, function(err, resclient){
                    if (err) return (err)
                    if (resclient === null){
                        err = new Error ("Maaf data tidak ditemukan")
                        return (err)
                    }

                    res[0].client = resclient[0]

                    return callback (null, res)
                })

                // if (!res) callback (err)
                // return callback (null, res)
            })
            .catch(function(err){
                callback (err);
            })
        }

};