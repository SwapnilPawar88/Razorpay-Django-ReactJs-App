from django.urls import include, path
from django.contrib import admin
from .views import RazorpayPaymentView , RazorpayCallback

urlpatterns = [
    path('razorpay_order', RazorpayPaymentView.as_view(), name='razorpay_order'),
    path('razorpay_callback', RazorpayCallback.as_view(), name='razorpay_callback'),
]