import { shallowMount } from "@vue/test-utils"
import Contact from "./Contact";

describe("Contact", () => {
  const name = 'contact-name';
  const email = 'contact@email.com';
  const url = 'http://contact.url.com';

  it("should show 'Contact:' text", () => {
    let sutWrapper = shallowMount(Contact);
    expect(sutWrapper.find("#Contact").text()).toBe("Contact:");
  });

  describe("name, email and url are provided", () => {
    let sutWrapper;

    beforeEach(() => {
      sutWrapper = shallowMount(Contact, {
        propsData: {
          name: name,
          email: email,
          url: url
        }
      });
    })

    it('should display the name of the contact', () => {
      expect(sutWrapper.props().name).toBe(name);
      expect(sutWrapper.find(".contact-element").exists()).toBe(true);
      expect(sutWrapper.find(".contact-element").text()).toEqual(name);
    });

    it('should link contact mail to email', () => {
      const contactElement = sutWrapper.find(".contact-element");

      expect(sutWrapper.props().email).toBe(email);
      expect(contactElement.attributes('href')).toBe(`mailto:${email}`);
    });

    it('should display url with link', () => {
      const contactElement = sutWrapper.findAll(".contact-element").at(1);

      expect(sutWrapper.props().email).toBe(email);
      expect(contactElement.text()).toBe(url);
      expect(contactElement.attributes('href')).toBe(url);
    });
  });

  describe('name and email are provided, but url is not', () => {
    it('should show name, but not url', () => {
      let sutWrapper = shallowMount(Contact, {
        propsData: {
          name: name,
          email: email
        }
      });

      expect(sutWrapper.findAll(".contact-element").length).toBe(1);
      expect(sutWrapper.find(".contact-element").text()).toBe(name);
    });
  });
});
