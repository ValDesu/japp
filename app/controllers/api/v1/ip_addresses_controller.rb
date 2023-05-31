require 'faraday'

class Api::V1::IpAddressesController < ApplicationController

    #POST /register_ip
    def register_ip
        #Check if ip address is already saved in database
        @ip_address = IpAddress.find_by(ip_address: params[:ip])
        #if ip address exists, return error
        if @ip_address
            render json: {message: "error", ip: params[:ip], free_try: false, waiting_time: 24.hours.ago - @ip_address.created_at}
            return
        end
        #if ip address doesn't exist, save it in database
        @ip_address = IpAddress.new(ip_address: params[:ip])
        if @ip_address.save
            render json: {message: "success", ip: params[:ip], free_try: true, waiting_time: 0}
        else
            render json: {message: "error", ip: params[:ip], free_try: false, waiting_time: -1}
        end
    end

    #GET /free_try
    def free_try
        #Check if ip address is already saved in database
        @ip_address = IpAddress.find_by(ip_address: params[:ip])
        #if ip address exists, return error
        if @ip_address
            #check if created at is more than 24 hours ago
            if @ip_address.created_at < 24.hours.ago
                #delete ip address from database
                @ip_address.destroy
                render json: {message: "succes", ip: params[:ip], free_try: true, waiting_time: 0}
                return
            else
                waiting_time_seconds = (@ip_address.created_at - 24.hours.ago).to_i
                waiting_time_hours = waiting_time_seconds / 3600
                waiting_time_minutes = (waiting_time_seconds % 3600) / 60
                formatted_waiting_time = format('%02d hour(s) and %02d minute(s)', waiting_time_hours, waiting_time_minutes)

                render json: {message: "error", ip: params[:ip], free_try: false, waiting_time: formatted_waiting_time }
                return
            end
        end
        
        render json: {message: "success", ip: params[:ip], free_try: true, waiting_time: 0}
    end
end