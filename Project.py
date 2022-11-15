class Project:

    def __init__(self, name, ID, description, members, hardware=None):
        self.__name = name
        self.__ID = ID
        self.__description = description
        self.__members = members
        if hardware is None:
            self.__hardware = [0, 0]
        else:
            self.__hardware = hardware

    def set_name(self, name):
        self.__name = name

    def set_ID(self, ID):
        self.__ID = ID

    def set_description(self, description):
        self.__description = description

    def get_name(self):
        return self.__name

    def get_ID(self):
        return self.__ID

    def get_description(self):
        return self.__description

    def get_members(self):
        return self.__members

    def get_hardware(self):
        return self.__hardware

    def add_member(self, name):
        self.__members.append(name)

    def delete_member(self, name):
        self.__members.remove(name)

    def add_hardware(self, hw, amount):
        self.__hardware[hw] += amount

    def remove_hardware(self, hw, amount):
        current_amount = self.__hardware[hw]
        if current_amount <= amount:
            self.__hardware[hw] = 0
        else:
            self.__hardware[hw] = current_amount - amount

