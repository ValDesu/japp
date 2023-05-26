require 'faraday'

class Api::V1::IpAddressesController < ApplicationController

    #GET /free_try
    def free_try
        #Check if ip address is already saved in database
        puts "checking if ip address exists"
        @ip_address = IpAddress.where(ip_address: params[:ip])
        puts @ip_address.length
        #if ip address exists, return error
        if @ip_address.length > 0
            puts "ip address exists"
            render json: {message: "error", ip: params[:ip], free_try: false}
        end
        
        render json: {message: "success", ip: params[:ip], free_try: true}
    end
end