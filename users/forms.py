import re

from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import Profile


class UserRegisterForm(UserCreationForm):
    email = forms.EmailField()

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']


class UserUpdateForm(forms.ModelForm):
    email = forms.EmailField()

    class Meta:
        model = User
        fields = ['username', 'email']
        help_texts = {
            'username': 'Required. 15 characters or fewer. Letters, digits and @/./+/-/_ only.',
        }

    def clean(self):
        # data from the form is fetched using super function
        super(UserUpdateForm, self).clean()

        # extract the username and text field from the data
        username = self.cleaned_data.get('username')

        # conditions to be met for the username length
        if len(username) > 15:
            self._errors['username'] = self.error_class([
                'Maximum 15 characters allowed.'])

        # return any errors if found
        return self.cleaned_data


class ProfileUpdateForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['image', 'country_code', 'phone']


class ProfilePhoneNumberForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['country_code', 'phone']

    def clean(self):
        # data from the form is fetched using super function
        super(ProfilePhoneNumberForm, self).clean()

        # extract the username and text field from the data
        phone = self.cleaned_data.get('phone')
        if not re.match(r'\d{4,10}', phone):
            self._errors['phone'] = self.error_class([
                'Invalid phone number.'])
        # return any errors if found
        return self.cleaned_data