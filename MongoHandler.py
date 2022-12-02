import pymongo
import Project
import certifi
import User
import hardwareSet
import rsa


class DataHandler:
    with open('public.pem', 'rb') as f:
        public_key = rsa.PublicKey.load_pkcs1(f.read())

    with open('private.pem', 'rb') as f:
        private_key = rsa.PrivateKey.load_pkcs1(f.read())

    def __init__(self):
        ca = certifi.where()
        self.client = pymongo.MongoClient("mongodb+srv://SpenceSimm:2818Tgr2512@cluster0.i65tsrq.mongodb.net"
                                          "/?retryWrites=true&w=majority", tlsCAFile=ca)

    def create_project(self, project):
        """
        Adds a project to the database
        :param project: Project object to be inserted into the database
        :return: True if project creation was successful, false if a project with the same ID is already in the database
        """
        db = self.client.Projects
        collection = db['Project']

        exists = self.verify_project_exists(project.get_ID())
        if exists:
            return False
        else:
            member_list = project.get_members()
            member_list_to_add_to_document = []
            for member in member_list:
                member_list_to_add_to_document.append(
                    [member.username, member.ID, rsa.encrypt(member.password.encode(), DataHandler.public_key)])

            project_to_be_inserted = {"name": project.get_name(),
                                      "ID": project.get_ID(),
                                      "Description": project.get_description(),
                                      "members": member_list_to_add_to_document,
                                      "hardware": project.get_hardware()}

            collection.insert_one(project_to_be_inserted)
            return True

    def verify_project_exists(self, id):
        """
        Verifies if a project with "ID" exists in the database
        :param id: ID of a project
        :return: True if project with specific ID is found, False otherwise
        """
        db = self.client.Projects
        collection = db['Project']
        project_verified = collection.find_one({'ID': id})
        if project_verified is None:
            return False
        else:
            return True

    def is_user_in_project(self, user_id, project_id):
        """
        Checks if user is a member of a particular project
        :param user_id: User ID
        :param project_id: Project ID
        :return: True if the user is a member of the project, false otherwise
        """
        db = self.client.Projects
        collection = db['Project']
        project_verified = collection.find_one({'ID': project_id})
        member_list = project_verified['members']
        for member in member_list:
            id = member[1]
            if id == user_id:
                return True
        return False

    def add_user_to_project(self, project, user):
        """
        Adds a user to a project in the database
        :param project: Project to add the user to
        :param user: User that is to be inserted
        :return: True always
        """
        db = self.client.Projects
        collection = db['Project']
        if self.is_user_in_project(user.ID, project):
            return False
        else:
            project_to_add_to = collection.find_one({'ID': project})
            member_set = project_to_add_to['members']
            member_set.append([user.username, user.ID, rsa.encrypt(user.password.encode(), DataHandler.public_key)])
            new_data = {'$set': {'members': member_set}}
            collection.update_one({'ID': project}, new_data)
            return True

    def remove_user_from_project(self, project_id, user_id):
        db = self.client.Projects
        collection = db['Project']
        project_verified = collection.find_one({'ID': project_id})
        user_list = project_verified['members']
        for member in user_list:
            if member[1] == user_id:
                user_list.remove(member)

        new_data = {'$set': {'members': user_list}}
        collection.update_one({'ID': project_id}, new_data)

    def verify_user_exists(self, id):
        """
        Verifies a user with "ID" exists in the database
        :param id: User ID used for verification
        :return: True if user with specified ID is found, false otherwise
        """
        db = self.client.users
        collection = db['users']
        user_verified = collection.find_one({'ID': id})
        if user_verified is None:
            return False
        else:
            return True

    def verify_login(self, id, password):
        """
        Verifies login given credentials
        :param id: User ID
        :param password: User password
        :return: True if ID and password matches a User in the database, false otherwise
        """
        db = self.client.users
        collection = db['users']
        user_verified = collection.find_one({'ID': id})
        if user_verified is None:
            return False
        else:
            password_on_record = rsa.decrypt(user_verified['password'], DataHandler.private_key).decode()
            if password == password_on_record:
                return True
            else:
                return False

    def create_user(self, user):
        """
        Adds a user to the database
        :param user: User object to be added to the database
        :return: False if the user already exists, true otherwise
        """
        db = self.client.users
        collection = db['users']
        exists = self.verify_user_exists(user.ID)
        if exists:
            return False
        else:
            collection.insert_one({'username': user.username,
                                   'ID': user.ID,
                                   'password': rsa.encrypt(user.password.encode(), DataHandler.public_key)})
            return True

    def close_connection(self):
        """
        Closes connection to MongoDB
        """
        self.client.close()

    def get_project(self, ID):
        """
        Gets a project from the database
        :param ID: Project ID used to identify the project in the database
        :return: Project object with all the project information
        """
        db = self.client.Projects
        collection = db['Project']
        project_verified = collection.find_one({'ID': ID})
        return Project.Project(project_verified['name'], project_verified['ID'], project_verified['Description'],
                               project_verified['members'], project_verified['hardware'])

    def add_hw(self, hw):
        """
        Adds hardware to the database. Note: This method should not be used by the frontend. Users shouldn't be able to
        add their own hardware
        :param hw: Hardware object to be inserted
        :return: True if add is successful, false otherwise
        """
        db = self.client.hardwareSets
        collection = db['HWSet']
        hardware_exists = collection.find_one({'name': hw.get_name()})
        if hardware_exists is None:
            collection.insert_one({'name': hw.get_name(),
                                   'capacity': hw.get_capacity(),
                                   'availability': hw.get_availability()})
            return True
        else:
            return False

    def alter_availability(self, hw, amount):
        """
        Alters availability field of a specified hardware
        :param hw: name of a hardware set
        :param amount: amount to change to
        """
        db = self.client.hardwareSets
        collection = db['HWSet']
        hw_set = {'name': hw}
        new_data = {'$set': {'availability': amount}}
        collection.update_one(hw_set, new_data)

    def get_capacity(self, choice):
        db = self.client.hardwareSets
        collection = db['HWSet']
        name = ''
        if choice == 0:
            name = 'HWSet1'
        else:
            name = 'HWSet2'
        hw_set = collection.find_one({'name': name})
        return hw_set['capacity']

    def get_hw(self, name):
        """
        Gets a hardware set by name
        :param name: name of a hardware set
        :return: Hardware object with all information
        """
        db = self.client.hardwareSets
        collection = db['HWSet']
        hw_set = collection.find_one({'name': name})
        return_set = hardwareSet.HardwareSet(name, hw_set['capacity'], hw_set['availability'])
        return return_set

    def is_hardware_in_project(self, project_id, hw):
        """
        Checks if hw is in a specified project. This method is for internal use in MongoHandler
        :param project_id: Project ID
        :param hw: Name of hardware
        :return: True if hw is in Project's list of hw, false otherwise
        """
        db = self.client.Projects
        collection = db['Project']
        project_verified = collection.find_one({'ID': project_id})
        hw_list = project_verified['hardware']
        for hw_set in hw_list:
            if hw_set[0] == hw:
                return True
        return False

    def get_hardware_in_project(self, project_id, hw):
        """
        Gets amount of hw that's in a project
        :param project_id: Project ID
        :param hw: name of hw
        :return: amount of hw in project
        """
        db = self.client.Projects
        collection = db['Project']
        project_verified = collection.find_one({'ID': project_id})
        return project_verified['hardware'][hw]

    def add_hardware_to_project(self, project_id, hw, qty):
        """
        Adds hardware to a project
        :param project_id: Project ID
        :param hw: name of hardware
        :param qty: amount to add
        """
        db = self.client.Projects
        collection = db['Project']
        project_verified = collection.find_one({'ID': project_id})
        hw_list = project_verified['hardware']
        new_hw_list = [0, 0]
        if hw == 0:
            new_hw_list[0] = qty
            new_hw_list[1] = hw_list[1]
        else:
            new_hw_list[0] = hw_list[0]
            new_hw_list[1] = qty
        new_data = {'$set': {'hardware': new_hw_list}}
        collection.update_one({'ID': project_id}, new_data)

    def checkout_hardware(self, project_id, choice, qty):
        """
        Checks out an amount of a hardware set. Frontend should use this method for checking out.
        :param project_id: Project ID checking out
        :param choice: Name of a hardware set
        :param qty: Amount to check out
        :return: True
        """
        name = ''
        if choice == 0:
            name = 'HWSet1'
        else:
            name = 'HWSet2'
        hw = self.get_hw(name)
        amount_in_project = self.get_hardware_in_project(project_id, choice)
        if amount_in_project == 0:
            amount_in_project = hw.check_out(qty)
            self.alter_availability(name, hw.get_availability())
            self.add_hardware_to_project(project_id, choice, amount_in_project)
        else:
            amount_in_project = amount_in_project + hw.check_out(qty)
            self.alter_availability(name, hw.get_availability())
            self.add_hardware_to_project(project_id, choice, amount_in_project)
        return True

    def check_in_hardware(self, project_id, choice, qty):
        """
        Checks in an amount of a hardware set. Frontend should use this method for checking in.
        :param project_id: Project ID checking in
        :param choice: Name of the hardware set
        :param qty: amount to check in
        :return: True
        """

        name = ''
        if choice == 0:
            name = 'HWSet1'
        else:
            name = 'HWSet2'
        hw = self.get_hw(name)
        amount_in_project = self.get_hardware_in_project(project_id, choice)
        amount_in_project -= qty
        hw.check_in(qty)
        self.alter_availability(name, hw.get_availability())
        self.add_hardware_to_project(project_id, choice, amount_in_project)
        return True

    def get_all_users(self, project_id):
        """
        Gets all users in the in a particular project
        :param project_id: Project to look at
        :return: list of Users in the project
        """
        db = self.client.Projects
        collection = db['Project']
        project_verified = collection.find_one({'ID': project_id})
        member_list = project_verified['members']
        return_list = []
        for member in member_list:
            new_user = User.User(member[0], member[1], rsa.decrypt(member[2], DataHandler.private_key).decode())
            return_list.append(new_user)

        return return_list

    def get_all_projects_by_ID(self, user_id):
        """
        Gets all projects that a user is a member of
        :param user_id: User ID
        :return: List of projects that "ID" is a member of
        """
        db = self.client.Projects
        collection = db['Project'].find()
        project_array = []
        for project in collection:
            if self.is_user_in_project(user_id, project['ID']):
                member_list = []
                for member in project['members']:
                    member_list.append(User.User(member[0], member[1], rsa.decrypt(member[2],
                                                                                   DataHandler.private_key).decode()))

                new_project = Project.Project(project['name'], project['ID'], project['Description'],
                                              member_list, project['hardware'])
                project_array.append(new_project)
        return project_array

    def get_name_by_id(self, id):
        db = self.client.users
        collection = db['users']
        user_verified = collection.find_one({'ID': id})
        if user_verified is None:
            return False
        else:
            return user_verified['username']

    def get_user_by_id(self, id):
        db = self.client.users
        collection = db['users']
        user_verified = collection.find_one({'ID': id})
        if user_verified is None:
            return False
        else:
            return User.User(user_verified['username'], user_verified['ID'], user_verified['password'])

