module.exports = function(Employee) { 
    Employee.remoteMethod(
    'getNameTomi' ,
    {
        description: 'get name like -> tomi',
        accepts: [
            { arg: 'firstname', type: 'string' }
        ],
        returns: {
            arg:'res', type: 'object', root : true
        },
        https: {path: 'getNameTomi',verb:'get' }
    }

);

Employee.getNameTomi = function(firstname, callback) {
    new Promise (function(resolve,reject){
        var filter = {
            where : {
                first_name : {
                    like : firstname
                }
            }
        }
        Employee.find (filter, function(err, result){
            if (err) reject (err)
            if (result === null){
                err = new Error ('Cannot find that name')
                err.statusCode = 404
                reject (err)
            }

            resolve (result)

            })
        }).then(function(res){
            if (!res) callback (err)
            return callback(null,res)

        }).catch(function(err){
            callback(err);
        });
    }
}
