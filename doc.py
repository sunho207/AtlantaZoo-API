from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# API Routes

@app.route('/user', methods=['GET'])
def login():
    # Used for Login

    # Params:
    # username
    # password

    # Dummy Data
    user = {
        'user_id': '1',
        'username': 'Admin',
        'email': 'skim880@gatech.edu',
        'role': 'visitor' # (visitor/staff/admin)
    }
    return jsonify(user)

@app.route('/user', methods=['POST'])
def register():
    # Used for Register

    # Params:
    # email
    # username
    # password
    # role (staff/visitor)

    # Dummy Data
    response = {
        'success': True
    }

    return jsonify(response)

@app.route('/exhibits', methods=['GET'])
def getExhibits():
    # Used for Search for Exhibits

    # Params:
    # name
    # size_min
    # size_max
    # number_of_animals_min
    # number_of_animals_max
    # water_feature
    # sort

    # Dummy Data
    response = [
        {
            'exhibit_id': 123,
            'name': 'Asia',
            'size': 34,
            'number_of_animals': 6,
            'water_feature': 'Yes'
        },
        {   
            'exhibit_id': 224,
            'name': 'Africa',
            'size': 2,
            'number_of_animals': 3,
            'water_feature': 'No'
        },
        {   
            'exhibit_id': 114,
            'name': 'Pacific',
            'size': 28,
            'number_of_animals': 4,
            'water_feature': 'No'
        }
    ]

    return jsonify(response)

@app.route('/exhibit', methods=['GET'])
def getExhibit():
    # Used for Exhibit Detail

    # Params:
    # exhibit_id

    # Dummy Data
    response = {
        'name': 'Asia',
        'size': 34,
        'number_of_animals': 6,
        'water_feature': 'Yes'
    }

    return jsonify(response)

@app.route('/exhibit/log', methods=['POST'])
def postExhibitLog():
    # Used for Exhibit Detail

    # Body:
    # user_id
    # exhibit_id
    # date

    # Dummy Data
    response = {
        'success': True
    }

    return jsonify(response)

@app.route('/animals', methods=['GET'])
def getAnimals():
    # Used for Search for Exhibits

    # Params:
    # exhibit_id
    # name
    # age_min
    # age_max
    # species
    # type
    # sort

    # Dummy Data
    response = [
        {
            'animal_id': 12,
            'name': 'Tony',
            'species': 'Tiger',
            'age': 4,
            'exhibit': 'Asia',
            'type': 'Mammal'
        }, {
            'animal_id': 14,
            'name': 'Simba',
            'species': 'Lion',
            'age': 3,
            'exhibit': 'Africa',
            'type': 'Mammal'
        }
    ]

    return jsonify(response)

@app.route('/animal', methods=['GET'])
def getAnimal():
    # Used for Animal Detail

    # Params:
    # animal_id

    # Dummy Data
    response = {
        'name': 'Tony',
        'species': 'Tiger',
        'age': 4,
        'exhibit': 'Asia',
        'type': 'Mammal'
    }

    return jsonify(response)

@app.route('/shows', methods=['GET'])
def getShows():
    # Used for Search for Shows

    # Params:
    # name
    # exhibit_id
    # date
    # sort

    # Dummy Data
    response = [
        {
            'show_id': 12,
            'name': 'Feed the fish',
            'exhibit': 'Pacific',
            'date': '9/19/18 3:00 PM',
        }, {
            'show_id': 12,
            'name': 'Feed the fish',
            'exhibit': 'Pacific',
            'date': '9/19/18 4:00 PM',
        }
    ]

    return jsonify(response)

@app.route('/show/log', methods=['POST'])
def postShowLog():
    # Used for Exhibit Detail

    # Body:
    # user_id
    # show_id
    # date

    # Dummy Data
    response = {
        'success': True
    }

    return jsonify(response)

@app.route('/exhibits/history', methods=['GET'])
def getExhibitHistory():
    # Used for Exhibit History

    # Params:
    # name
    # number_of_visits_min
    # number_of_visits_max
    # date
    # sort

    # Dummy Data
    response = [
        {
            'exhibit_id': 12,
            'name': 'Pacific',
            'date': '9/19/18 3:00 PM',
            'number_of_visits': 6,
        }, {
            'exhibit_id': 12,
            'name': 'Pacific',
            'date': '9/19/18 3:00 PM',
            'number_of_visits': 6,
        }
    ]

    return jsonify(response)


@app.route('/shows/history', methods=['GET'])
def getShowHistory():
    # Used for Show History

    # Params:
    # name
    # exhibit_id
    # date
    # sort

    # Dummy Data
    response = [
        {
            'name': 'Feed the fish',
            'exhibit': 'Pacific',
            'date': '9/19/18 3:00 PM',
        }, {
            'name': 'Feed the fish',
            'exhibit': 'Pacific',
            'date': '9/19/18 3:00 PM',
        }
    ]

    return jsonify(response)

@app.route('/staff/shows', methods=['GET'])
def getStaffShows():
    # Used for Staff Shows

    # Params:
    # user_id

    # Dummy Data
    response = [
        {
            'name': 'Feed the fish',
            'exhibit': 'Pacific',
            'date': '9/19/18 3:00 PM',
        }, {
            'name': 'Feed the fish',
            'exhibit': 'Pacific',
            'date': '9/19/18 3:00 PM',
        }, 
    ]

    return jsonify(response)

@app.route('/animal/care', methods=['GET'])
def getAnimalCare():
    # Used for Animal Care

    # Params:
    # animal_id

    # Dummy Data
    response = [
        {
            'staff': 'Ellen',
            'note': 'Nemo did not swim well today',
            'date': '9/19/18 3:00 PM'
        }
    ]

    return jsonify(response)

@app.route('/animal/care', methods=['POST'])
def postAnimalCare():
    # Used for Animal Care

    # Body:
    # user_id
    # animal_id
    # note
    # date

    # Dummy Data
    response = {
        'success': True
    }

    return jsonify(response)

@app.route('/staff', methods=['GET'])
def getStaff():
    # Used for View Staff

    # No Parameters

    # Dummy Data
    response = [
        {
            'user_id': 12,
            'email': 'skim880@gatech.edu',
            'username': 'sunho207'
        }
    ]

    return jsonify(response)

@app.route('/visitors', methods=['GET'])
def getVisitors():
    # Used for View Visitors

    # No Parameters

    # Dummy Data
    response = [
        {
            'user_id': 12,
            'email': 'skim880@gatech.edu',
            'username': 'sunho207'
        }
    ]

    return jsonify(response)

@app.route('/user', methods=['DELETE'])
def deleteUser():
    # Used for View Visitor/View Staff

    # Body:
    # user_id

    # Dummy Data
    response = {
        'success': True
    }

    return jsonify(response)

@app.route('/show', methods=['DELETE'])
def deleteShow():
    # Used for View Shows Admin

    # Body:
    # show_id

    # Dummy Data
    response = {
        'success': True
    }

    return jsonify(response)

@app.route('/animal', methods=['DELETE'])
def deleteAnimal():
    # Used for View Animals Admin

    # Body:
    # animal_id

    # Dummy Data
    response = {
        'success': True
    }

    return jsonify(response)

@app.route('/animal', methods=['POST'])
def postAnimal():
    # Used for Add Animal

    # Body:
    # name
    # exhibit_id
    # species
    # type
    # age

    # Dummy Data
    response = {
        'success': True
    }

    return jsonify(response)


@app.route('/show', methods=['POST'])
def postShow():
    # Used for Add Show

    # Body:
    # name
    # exhibit_id
    # user_id (staff)
    # date

    # Dummy Data
    response = {
        'success': True
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)