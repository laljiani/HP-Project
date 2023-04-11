from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views

from . import views
urlpatterns = [
        path ('', views.index, name='index'),
        path ('index/', views.index, name='index'),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)