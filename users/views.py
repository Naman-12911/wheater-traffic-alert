from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .forms import UserRegisterForm, UserUpdateForm, ProfileUpdateForm, ProfilePhoneNumberForm
from django.contrib import messages

from .models import Profile


@login_required
def home(request):
    return redirect('map')


def register(request):
    if request.user.is_authenticated:
        return redirect('users-home')
    context = {}
    if request.method == "POST":
        form = UserRegisterForm(request.POST)
        phone_number_form = ProfilePhoneNumberForm(request.POST)
        if form.is_valid() and phone_number_form.is_valid():
            instance = form.save()
            Profile.objects.create(user=instance, phone=request.POST.get('phone'), country_code=request.POST.get('country_code'))
            username = form.cleaned_data.get('username')
            messages.success(request, f'Account Created for {username}')
            return redirect('login')
    else:
        form = UserRegisterForm()
        phone_number_form = ProfilePhoneNumberForm()
    context['form'] = form
    context['phone_number_form'] = phone_number_form
    context['title'] = 'Register'
    return render(request, 'users/register.html', context)


@login_required
def profile(request):
    if request.method=="POST":
        u_form = UserUpdateForm(request.POST, instance=request.user)
        p_form = ProfileUpdateForm(request.POST, request.FILES, instance=request.user.profile)

        if u_form.is_valid() and p_form.is_valid():
            u_form.save()
            p_form.save()
            messages.success(request, f'Account has been updated')
            return redirect('profile')
    else:
        u_form = UserUpdateForm(instance=request.user)
        p_form = ProfileUpdateForm(instance=request.user.profile)
    context = {
        'u_form': u_form,
        'p_form': p_form
    }
    return render(request, 'users/profile.html', context)
