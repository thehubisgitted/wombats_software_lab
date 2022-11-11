class User:

    def __init__(self, username, ID, password):
        self.username = username
        self.ID = ID
        self.password = password

    def set_username(self, username):
        self.username = username

    def set_userID(self,ID):
        self.ID = ID

    def set_password(self, password):
        self.password = password
