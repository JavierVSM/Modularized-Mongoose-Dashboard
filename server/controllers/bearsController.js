const {BearModel} = require( './../models/bearModel' );

const BearController = {
    
        getIndex: function (request, response){
            BearModel
                .getBears()
                .then (data  => {
                    response.render ('index', {bears:data});
                });
        },

        //'/bears/new'
        displayNew: function (request, response){
            response.render ('new');    
        },
//'/bears/:name'
        displayBear: function (request, response){
            let id = request.params.name;
            BearModel
            .getBearbyId (id)
            .then (result  => {
                if (result === null){
                    throw new Error("null");
                }
                response.render('bear', {found:true, bear:result});
            })
            .catch( err => {
                response.render('bear', {found:false});
            });
        },

        //'/bears'
        addBear: function (request, response){
            const name= request.body.name;
            const location= request.body.location;
            const color= request.body.color;
            const description= request.body.description;

            const newBear = {
                name,
                location,
                color,
                description
            };

            BearModel
                .createBear(newBear)
                .then( result => {
                    response.redirect('/');
            })
                .catch( err => {
                    console.log("Something goes wrong!");
                    console.log(err);
                });
            response.redirect('/');
        },

        //'/bears/edit/:name'
        displayEditBear: function(request, response){
            var name = request.params.name;
            BearModel
            .getBearbyId (name)
            .then (result  => {
                if (result === null){
                    throw new Error("null");
                }
                response.render('edit', {found:true, bear:result});
            })
            .catch( err => {
                response.render('edit', {found:false});
            });
        },

        //'/bears/:id'
        editBear: function( request, response){
            const bearToChange = request.params.id;

            const name= request.body.name;
            const location= request.body.location;
            const color= request.body.color;
            const description= request.body.description;

            const change={
                name,
                location,
                color,
                description
            }

            BearModel
                .updateBear(bearToChange, change)
                .then( result =>{
                    console.log(result);
                })
                .catch( err =>{
                    console.log(err);
                })
            response.redirect('/');
        },

//'/bears/destroy/:name'
        deleteBear: function (request, response){
            let id = request.params.name;
            console.log (id);
            console.log ("test test test test");
            BearModel
            .deleteBearById (id)
            .then( result => {
                console.log(result );
        })
            .catch( err => {
                console.log("Something went wrong!");
                console.log(err);
            });
        response.redirect('/');
        }
}

module.exports={BearController};