class HardwareSet():
    # constructor
    # def __init__(self, name, name):
    #     self.__name = name
    #     self._capacity = qty
    #     self.availability = self._capacity

    def __init__(self, name, qty, availability=-1):
        self.__name = name
        self._capacity = qty
        if availability == -1:
            self.availability = self._capacity
        else:
            self.availability = availability

    # returns availability
    def get_availability(self):
        return self.availability

    # returns capacity amount
    def get_capacity(self):
        return self._capacity

    # returns amount checked out currently, which is capacity - availability
    def get_checkedout_qty(self):
        return self._capacity - self.availability

    # checks if the requested quantity to checkout is valid, then updates availability and returns amount checked out
    def check_out(self, qty):
        if qty > self.availability:
            return_amount = self.get_availability()
            self.availability = 0
            return return_amount
        else:
            self.availability = self.availability - qty
            return qty

    # adds qty to availability
    def check_in(self, qty):
        self.availability += qty

    def get_name(self):
        return self.__name