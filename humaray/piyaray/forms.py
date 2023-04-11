from django.forms import ModelForm
# from django_countries import countries
from django import forms
from .models import Customer, Grave, Services,Graveyard,Tester,Feedback
from django.contrib.auth.forms import UserCreationForm,PasswordChangeForm,PasswordResetForm,UserChangeForm
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
# from django_countries.fields import CountryField
from django.http import HttpResponse
from django.forms.widgets import RadioSelect,DateInput
# from django.db import models
import datetime

#exaple of custom widget
#define as below and the use it as
# birthDate = forms.DateField(widget=CustomDateInput)
class CustomDateInput(DateInput):
    def __init__(self, attrs=None):
        if attrs is None:
            attrs = {}
        attrs['type'] = 'date'
        attrs['use_required_attribute'] = True
        super().__init__(attrs)

class MyPasswordChangeForm(PasswordChangeForm):
    def __init__ (self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        for fieldname in ['old_password', 'new_password1', 'new_password2']:
            self.fields[fieldname].widget.attrs = {'class':'form-div'}

class MyPasswordResetForm(PasswordResetForm):
    def __init__ (self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        for fieldname in ['old_password', 'new_password1', 'new_password2']:
            self.fields[fieldname].widget.attrs = {'class':'form-control2'}

class CustomerUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = User
        # fields = '__all__'
        fields=('username','email','first_name','last_name')
        # exclude=[]

class MyUserChangeForm(UserChangeForm):
    # email = forms.EmailField(required=True)
    class Meta(UserChangeForm.Meta):
        model = User
        # fields = '__all__'
        fields=('username','email','first_name','last_name','groups')
        # exclude=[]

    # def __init__ (self, *args, **kwargs):
    #     super().__init__(*args, **kwargs)
        # if self.instance and self.instance.pk:
            # Since the pk is set this is not a new instance

        # self.fields['groups'].widget.attrs.update({'class':'form-control2',"row":3})
    
# password last_login is_superuser groups user_permissions username first_name last_name email is_staff is_active date_joined
        # for fieldname in ['username', 'first_name', 'last_name','email','groups']:
        #     self.fields[fieldname].widget.attrs = {'class':'form-control1'}

class CustomerForm(ModelForm):
    # country = CountryField().formfield()
    class Meta:
        model = Customer
        fields = ['mobile','country','address']
        widgets = {
            'mobile':forms.TextInput(attrs={'placeholder': '+CC XXX-XXX-XXXX'}),
        }

    # def __init__(self, *args, **kwargs):
        # super().__init__(*args, **kwargs)
        # self.fields['firstname'].label='firstname'
        # self.fields['firstname'].widget.attrs.update({'class':'form-control1',"placeholder":" not editable"})
        # self.fields['lastname'].widget.attrs.update({'class':'form-control1',"placeholder":" not editable"})
        # self.fields['user'].widget.attrs.update({'class':'form-control1'})
    
class FeedbackForm(forms.ModelForm):
    # test = forms.CharField(widget=forms.Textarea(attrs={'rows': 5,'placeholder':'hello'}))
    class Meta:
        model = Feedback
        fields = ('message','email')
        # fields = '__all__'
        widgets = {
            'message': forms.Textarea(attrs={"row":10,'placeholder': 'Type your message here'}),
            'email': forms.EmailInput(attrs={"placeholder":'Enter your email','style': 'width: 310px'})
        }

    
class CustomerFormAdmin(ModelForm):
    country = CountryField().formfield()
    class Meta:
        model = Customer
        fields = ['mobile','country','address','country_zone','email_verified','mobile_verified']
        widgets = {
            'mobile':forms.TextInput(attrs={'placeholder': '+CC XXX-XXX-XXXX'}),
        }
        
        # COUNTRY_CHOICES = [
        # ('C', 'Canada'),
        # ('CO', 'Congo'),
        # ('P', 'Pakistan'),
        # ('U', 'UK'),
        # ('O', 'Other'),
        # ]
        # country = forms.ChoiceField(
        #     required=False,
        #     widget=forms.Select,
        #     choices=COUNTRY_CHOICES,
        # )

class ServicesFormAdmin(forms.ModelForm):
    class Meta:
        model = Services
        fields = '__all__' 
       
class GraveyardFormAdmin(forms.ModelForm):
    class Meta:
        model = Graveyard
        fields = '__all__' 
       
       
    # def clean_mobile(self):
    #     '''
    #     Field level valiadation - field error
    #     '''
    #     mobile_passed = self.cleaned_data.get('mobile')
    #     if len(mobile_passed) < 5 or len(mobile_passed) >9:
    #         raise forms.ValidationError("invalid mobile number")
    #     return mobile_passed

    # def clean(self):
    #     '''
    #     Form level validation -- non field errors
    #     '''
    #     cleaned_data = super(CustomerForm,self).clean()
    #     mobile_passed = self.cleaned_data.get('mobile')
    #     if len(mobile_passed) < 5 or len(mobile_passed) >9:
    #         raise forms.ValidationError("invalid mobile number")
    #     return cleaned_data

class GraveForm(ModelForm):
    birthDate= forms.DateField(widget=DateInput(attrs={'type': 'date'}))
    expiryDate= forms.DateField(widget=DateInput(attrs={'type': 'date'}))
    class Meta:
        model = Grave
        fields = '__all__' 

class GraveFormAdmin(ModelForm):
    birthDate= forms.DateField(widget=DateInput(attrs={'type': 'date'}))
    expiryDate= forms.DateField(widget=DateInput(attrs={'type': 'date'}))
    class Meta:
        model = Grave
        fields = '__all__' 
        #bottom code works to change the label of a field
        # labels = {
        #     'husband': 'Khavind',
    
        # }

        # def __init__(self, *args, **kwargs):
            # super(GraveFormAdmin).__init__(*args, **kwargs)
            # self.fields['imageFile'].widget.attrs.update({"placeholder":" not editable"})
        # widgets = {
        #       'deceased':forms.CharField(attrs={'placeholder': 'Deceased'}),
        #     'birthDate': forms.DateField(widget = forms.DateInput(attrs={'placeholder':'DD/MM/YYYY'})),
        #     'expiryDate': forms.DateField(widget = forms.DateInput(attrs={'placeholder':'DD/MM/YYYY'}))
        # }
class CreateUserForm(UserCreationForm):
    class Meta:
        model = User      
        fields = ['username','email','first_name','last_name','groups','password1','password2','is_active','is_staff','is_superuser']
        # fields = '__all__'

    def __init__ (self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['groups'].widget.attrs.update({'class':'my-custom-class'})
    # def __init__(self, *args, **kwargs):
    #     super(CreateUserForm, self).__init__(*args, **kwargs)
    #     instance = getattr(self, 'instance', None)
    #     self.fields['password1'].widget.attrs['readonly'] = True
    #     self.fields['password2'].widget.attrs['readonly'] = True
       
      
    #     # del self.fields['password1']
    #     # del self.fields['password2']
    #     # self.fields['password1'].help_text = None
    #     # self.fields['username'].help_text = None

    # def clean_password1(self):
    #     instance = getattr(self, 'instance', None)
    #     if instance and instance.pk:
    #         return instance.password1
    #     else:
    #         return self.cleaned_data['password1']
class TestGraveForm(forms.ModelForm):
    relative = forms.BooleanField(required=False)
    linked_field = forms.CharField(required=False, label='Graveyard')

    class Meta:
        model = Grave
        # fields = '__all__' 
        fields = ['id','deceased','graveNumber','relative','linked_field']
        widgets = {
            'id': forms.HiddenInput(),
            'linked_field': forms.TextInput(attrs={'readonly': True})
        }
    def __init__(self, *args, **kwargs):
        super(TestGraveForm, self).__init__(*args, **kwargs)

    # Add fields from the linked model
        linked_obj = self.instance.graveyard
        self.fields['linked_field'].initial = linked_obj.name

    # Add a label to the checkbox``
        self.fields['relative'].label = 'Loved One? Check if YES!'

    # Customize the widgets
        # self.fields['field1'].widget.attrs['class'] = 'my-custom-class'
        # self.fields['field2'].widget.attrs['placeholder'] = 'Enter a value'
class RelativeForm(forms.ModelForm):
    relative = forms.BooleanField(
        required=False,
        widget=forms.CheckboxInput(attrs={'class': 'my-checkbox-class','value': 'default_value'})
    )
    myId = forms.IntegerField(widget=forms.HiddenInput(), required=False)
    reclist = forms.IntegerField(widget=forms.HiddenInput(), required=False)
    linked_field = forms.CharField(required=False, label='Graveyard')

    class Meta:
        model = Grave
        # fields = '__all__' 
        fields = ['myId',
                'reclist',
                'graveyard',
                'graveNumber',
                'grid',
                'distance',
                'uplink',
                'downlink',
                'deceased',
                'father',
                'relative',
                'husband',
                'expiryDate',
                'birthDate',
                'age',
                'gender',
                'imageFile',
                'linked_field',
                ]
        widgets = {
            'myId': forms.HiddenInput(),
            'reclist': forms.HiddenInput()
            # 'linked_field': forms.TextInput(attrs={'readonly': True})
        }

    def __init__(self, *args, **kwargs):
        dynamic_value = kwargs.pop('dynamic_value',None)
        # print("********** dynamic_value passed ",dynamic_value)
        super(RelativeForm, self).__init__(*args, **kwargs)
        if dynamic_value:
            self.fields['relative'].widget.attrs.update({'value': dynamic_value})
        
    # Add fields from the linked model
        # id = forms.IntegerField(widget=forms.HiddenInput(), required=False)
        linked_obj = self.instance.graveyard
        self.fields['myId'].initial = self.instance.id
        if linked_obj is not None:
            self.fields['linked_field'].initial = linked_obj.name

    # Add a label to the checkbox``
        self.fields['relative'].label = 'Loved One? Check if YES!'

    # Customize the widgets
        # self.fields['field1'].widget.attrs['class'] = 'my-custom-class'
        # self.fields['field2'].widget.attrs['placeholder'] = 'Enter a value'

class LoginForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)


class TestForm(forms.Form):
    BIRTH_YEAR_CHOICES = ['1980', '1981', '1982']
    FAVORITE_COLORS_CHOICES = [
        ('blue', 'Blue'),
        ('green', 'Green'),
        ('black', 'Black'),
        ]

       
    birth_year = forms.DateField(widget=forms.SelectDateWidget(empty_label=("Choose Year", "Choose Month", "Choose Day")))
    birth_year = forms.DateField(required=False,widget=forms.SelectDateWidget(empty_label=("Choose Year", "Choose Month", "Choose Day")))
    # birth_year = forms.DateField(widget=forms.SelectDateWidget(years=BIRTH_YEAR_CHOICES))
    favorite_colors = forms.MultipleChoiceField(
            required=False,
            widget=forms.CheckboxSelectMultiple,
            choices=FAVORITE_COLORS_CHOICES,
        )
    # name = forms.CharField()
    # url = forms.URLField()
    # comment = forms.CharField()



    # my_field = forms.MultipleChoiceField(widget=forms.CheckboxSelectMultiple)

    # def __init__(self, *args, **kwargs):
    #     choices = kwargs.pop('my_choices')
    #     super(TestForm, self).__init__(*args, **kwargs)
    #     self.fields['my_field'].choices = choices
        
    # renewal_date = forms.DateField(help_text="Enter a date between now and 4 weeks (default 3).")
    # GENDER_CHOICES = [
    #     ('male', 'Male'),
    #     ('female', 'Female'),
    #     ('other', 'Other'),
    # ]
    # gender = forms.ChoiceField(choices=GENDER_CHOICES, widget=forms.RadioSelect)
    # gender2 = forms.ChoiceField(choices=GENDER_CHOICES, widget=forms.SelectMultiple)
    # gender3 = forms.ChoiceField(choices=GENDER_CHOICES, widget=forms.SelectMultiple(attrs={'class': 'my-custom-class'}))
    # gender4 = forms.MultipleChoiceField(choices=GENDER_CHOICES, widget=forms.CheckboxSelectMultiple)


    # class Meta:
    #     model = Tester
    #     # fields = '__all__' 
    #     fields = ['school','username']

class OrdersForm(forms.Form):
    user = forms.CharField(required=False)
    orderNumber = forms.IntegerField(required=False)
    date = forms.DateField(widget=DateInput(attrs={'type': 'date'}))

#The following function is called by is_valid() call in views.py
#it does furtther validation to endure empty fields are removed and raise an error if the form is empty
    def clean(self):
        cleaned_data = super().clean()
        notEmpty = 3
        user = cleaned_data.get('user')
        if not user:
            del cleaned_data['user']
            user=None
            notEmpty -= 1
        if user and User.objects.filter(username=user).exists():
            rec = User.objects.get(username=user)
            cleaned_data['user']=rec.id
        # elif user:
        #     cleaned_data['user']=-1
        orderNumber = cleaned_data.get('orderNumber')
        if not orderNumber:
            del cleaned_data['orderNumber']
            notEmpty -= 1
        date = cleaned_data.get('date')
        if not date:
            del cleaned_data['date']
            notEmpty -= 1
        print("empty or notEmtyp ",notEmpty)
        if notEmpty:
            print("Retrning cleaned_data")
            return cleaned_data
        raise forms.ValidationError("No search tterm provided!")
 
class TypeForm(forms.Form):
    TYPE_CHOICES = (
        ('Syed', 'Syed'),
        ('Non-Syed', 'Non-Syed'),
        ('Any', 'Any'),
    )

    type = forms.ChoiceField(choices=TYPE_CHOICES, widget=forms.RadioSelect(attrs={'style': 'width: 20px; height: 20px;'}),label='Select',initial='Any')
    def __init__(self, *args, **kwargs):
        label = kwargs.pop('label', False)  # get the `label` argument from the `kwargs`
        super(TypeForm, self).__init__(*args, **kwargs)
        if label:
            self.fields['type'].label=label

class GeneralHelpForm(forms.Form):
    CURRENCY_CHOICES = [('USD','USD'),('EUR','EUR'), ('GBP','GBP'),('PKR','PKR')]
    TYPE_CHOICES = (
        ('Syed', 'Syed'),
        ('Non-Syed', 'Non-Syed'),
        ('Any', 'Any'),
    )

    currency = forms.ChoiceField(
            required=False,
            widget=forms.Select,
            choices=CURRENCY_CHOICES,
        )

    amount = forms.FloatField(label='Amount')
    def __init__(self, *args, **kwargs):
        readonly = kwargs.pop('readonly', False)  # get the `readonly` argument from the `kwargs`
        label = kwargs.pop('label', False)  # get the `label` argument from the `kwargs`
        super(GeneralHelpForm, self).__init__(*args, **kwargs)
        if readonly:
            self.fields['amount'].widget.attrs['readonly'] = 'readonly'  # set the `readonly` attribute on the widget
        if label:
            self.fields['amount'].label=label

    

class PublicationForm(forms.Form):

    PUB_CHOICES = [
        ('Quran','Quran'),
        ('Nahjul Balagha','Nahjul Balagha'), 
        ('Wazaif-ul-Abrar','Wazaif-ul-Abrar'),
        ('Sura-e-Yasin','Sura-e-Yasin'),
        ('Other','Other')
        ]
    TRANSLATION_CHOICES = (
        ('None', 'None'),
        ('Urdu', 'Urdu'),
        ('English', 'English'),
    )

    pub = forms.ChoiceField(
            required=False,
            widget=forms.Select,
            label='Select publication',
            choices=PUB_CHOICES,
        )
    translation = forms.ChoiceField(
           choices=TRANSLATION_CHOICES,
            required=False,
            widget=forms.Select,
            label='Translation Option',
            initial='Urdu')
    
    count = forms.IntegerField(min_value=50,label='Number of copies')

    other = forms.CharField(required=False,
                            label='Specify if `other` selected',
                            max_length=100,
                            )
    # def clean_other(self):
    #     other = self.cleaned_data['other']
    #     # print(" I am in clean_other")
    #     num_words = len(other.split())
    #     if num_words < 4:
    #         raise forms.ValidationError("Not enough words!")
    #     return other


class GenderForm(forms.Form):
    GENDER_CHOICES = (
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Any', 'Any'),
    )
    gender = forms.ChoiceField(choices=GENDER_CHOICES, widget=forms.RadioSelect(attrs={'style': 'width: 20px; height: 20px;'}),label=None,initial='Any')
    def __init__(self, *args, **kwargs):
        label = kwargs.pop('label', False)  # get the `label` argument from the `kwargs`
        super(GenderForm, self).__init__(*args, **kwargs)
        if label:
            self.fields['gender'].label=label

class SchoolForm(forms.Form):
    SCHOOL_CHOICES = (
        ('Primary', 'Primary'),
        ('Secondary', 'Secondary'),
        ('College', 'College'),
        ('University', 'University'),
        ('Any', 'Any'),
    )
    level = forms.ChoiceField(choices=SCHOOL_CHOICES, widget=forms.RadioSelect(attrs={'style': 'width: 20px; height: 20px;'}),label=None,initial='Any')
    def __init__(self, *args, **kwargs):
        label = kwargs.pop('label', False)  # get the `label` argument from the `kwargs`
        super(SchoolForm, self).__init__(*args, **kwargs)
        if label:
            self.fields['level'].label=label

class SearchForm(forms.Form): 
    gsearch = forms.CharField(required=True, label='')
    graveyard = forms.CharField(required=False, label='Graveyard')
    
class MurhoomSelectionForm(forms.Form): 
    # murhooms = forms.ModelChoiceField(queryset=Grave.objects.all(), widget=forms.Select)
    # print("*************************\n\n")

    murhooms = forms.ModelMultipleChoiceField(
        queryset = Grave.objects.all(),
        widget=forms.CheckboxSelectMultiple,
    )
    # print(murhooms)
    # def __init__(self, maplist=None, *args, **kwargs):
    #         super(MurhoomSelectionForm, self).__init__(*args, **kwargs)
    #         print("kill it")
            # if maplist:
            #     self.fields['murhooms'].queryset = Grave.objects.filter(pk=7)