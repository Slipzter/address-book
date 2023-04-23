package com.example.addressbook;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@CrossOrigin(origins = "http://localhost:8080/")
@RequestMapping("/api/address-book")
public class AddressBookController {

    private final AtomicLong counter = new AtomicLong();

    List<AddressBook> addressBook = new ArrayList<>();

    @GetMapping
    public List<AddressBook> getAllContacts() {
        return addressBook;
    }

    @PostMapping
    public AddressBook createNewContact(String name, String address) {
        AddressBook contact = new AddressBook(counter.incrementAndGet(), name, address);
        addressBook.add(contact);
        return contact;
    }

//    @PutMapping("/{id}")
//    public AddressBook updateContact(@PathVariable Long id, @RequestBody AddressBook contact) {
//        contact.setId(id);
//        return addressBookRepository.save(contact);
//    }
//
//    @DeleteMapping("/{id}")
//    public void deleteContact(@PathVariable Long id) {
//        addressBookRepository.deleteById(id);
//    }
}
