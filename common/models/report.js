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
        Report.getNameReport = function(barang , callback) {
            new Promise(function(resolve, reject){
                var filter = {
                    where : {
                        barang : {
                            like : barang
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
                if (!res) callback (err)
                return callback (null, res)
            })
            .catch(function(err){
                callback (err);
            })
        }

};