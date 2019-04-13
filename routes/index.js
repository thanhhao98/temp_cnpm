const router = require('express').Router();


router.get('/',(req,res)=>{
    res.status(200).send('<h1>hello woradfsadfasdf</h1>')
})
router.get('/api/v1/todos', (req, res) => {
    data = {
        "Search": [
            {
                "Title": "Indiana Jones and the Last Crusade",
                "Year": "1989",
                "imdbID": "tt0097576 ",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BMjNkMzc2N2QtNjVlNS00ZTk5LTg0MTgtODY2MDAwNTMwZjBjXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg"
            },
            {
                "Title": "Indiana Jones and the Temple of Doom",
                "Year": "1984",
                "imdbID": "tt0087469 ",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BMGI1NTk2ZWMtMmI0YS00Yzg0LTljMzgtZTg4YjkyY2E5Zjc0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
            },
            {
                "Title": "Indiana Jones and the Kingdom of the Crystal Skull",
                "Year": "2008",
                "imdbID": "tt0367882 ",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BMTIxNDUxNzcyMl5BMl5BanBnXkFtZTcwNTgwOTI3MQ@@._V1_SX300.jpg"
            },
            {
                "Title": "Indiana Jones and the Temple of the Forbidden Eye Ride",
                "Year": "1995",
                "imdbID": "tt0764648 ",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BMzk5ZmEyMTgtYzQ0ZC00YTEwLWExOTUtMDZhZmY5NDQ0OGJlXkEyXkFqcGdeQXVyNzAyNzI4Njc@._V1_SX300.jpg"
            },
            {
                "Title": "The Adventures of Young Indiana Jones: Treasure of the Peacock's Eye",
                "Year": "1995",
                "imdbID": "tt0115031 ",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BOTg2MTc2NDAzOF5BMl5BanBnXkFtZTcwODExNDIyMQ@@._V1_SX300.jpg"
            },
            {
                "Title": "The Adventures of Young Indiana Jones: Attack of the Hawkmen",
                "Year": "1995",
                "imdbID": "tt0154004 ",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BMTcwMTU5NjExMV5BMl5BanBnXkFtZTYwNzU3MTA5._V1_SX300.jpg"
            },
            {
                "Title": "The Adventures of Young Indiana Jones: Adventures in the Secret Service",
                "Year": "1999",
                "imdbID": "tt0250196 ",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BMzI1MDYzODM0MF5BMl5BanBnXkFtZTcwOTYwNjAyMQ@@._V1_SX300.jpg"
            },
            {
                "Title": "The Adventures of Young Indiana Jones: Daredevils of the Desert",
                "Year": "1999",
                "imdbID": "tt0275186 ",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BZDQ0NGI4ZjktYmQyNC00ZDZhLTgyMGYtYjU1Zjg5N2YzZDRlXkEyXkFqcGdeQXVyNjExODE1MDc@._V1_SX300.jpg"
            },
            {
                "Title": "The Adventures of Young Indiana Jones: Travels with Father",
                "Year": "1996",
                "imdbID": "tt0154003 ",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BMjU0NTY3M2UtZGJlYi00MDk4LWE0ZTAtZWI1MzcyZDg3Y2U5XkEyXkFqcGdeQXVyMzU0NzkwMDg@._V1_SX300.jpg"
            },
            {
                "Title": "The Adventures of Young Indiana Jones: Trenches of Hell",
                "Year": "1999",
                "imdbID": "tt0250199 ",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BNzgzMDQxNjY3N15BMl5BanBnXkFtZTcwODQ0NTgxMQ@@._V1_SX300.jpg"
            }
        ],
        "totalResults": "135",
        "Response": "True"
    }
    res.status(200).send(data);
});
router.get('/api/v1/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    db.map((todo) => {
        if (todo.id === id) {
        return res.status(200).send({
            success: 'true',
            message: 'todo retrieved successfully',
            todo,
        });
        }
    });
    return res.status(404).send({
        success: 'false',
        message: 'todo does not exist',
    });
});
  
router.post('/api/v1/todos', (req, res) => {
    if (!req.body.title) {
        return res.status(400).send({
        success: 'false',
        message: 'title is required',
        });
    } else if (!req.body.description) {
        return res.status(400).send({
        success: 'false',
        message: 'description is required',
        });
    }
    const todo = {
        id: db.length + 1,
        title: req.body.title,
        description: req.body.description,
    };
    db.push(todo);
    return res.status(201).send({
        success: 'true',
        message: 'todo added successfully',
        todo,
    });
});

  
router.put('/api/v1/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    let todoFound;
    let itemIndex;
    db.map((todo, index) => {
        if (todo.id === id) {
        todoFound = todo;
        itemIndex = index;
        }
    });

    if (!todoFound) {
        return res.status(404).send({
        success: 'false',
        message: 'todo not found',
        });
    }

    if (!req.body.title) {
        return res.status(400).send({
        success: 'false',
        message: 'title is required',
        });
    } else if (!req.body.description) {
        return res.status(400).send({
        success: 'false',
        message: 'description is required',
        });
    }

    const newTodo = {
        id: todoFound.id,
        title: req.body.title || todoFound.title,
        description: req.body.description || todoFound.description,
    };

    db.splice(itemIndex, 1, newTodo);

    return res.status(201).send({
        success: 'true',
        message: 'todo added successfully',
        newTodo,
    });
});
  
router.delete('/api/v1/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    let todoFound;
    let itemIndex;
    db.map((todo, index) => {
        if (todo.id === id) {
        todoFound = todo;
        itemIndex = index;
        }
    });

    if (!todoFound) {
        return res.status(404).send({
        success: 'false',
        message: 'todo not found',
        });
    }
    db.splice(itemIndex, 1);

    return res.status(200).send({
        success: 'true',
        message: 'Todo deleted successfuly',
    });
});

module.exports = router;