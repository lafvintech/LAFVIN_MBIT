.. __Forklift Advanced:

Forklift Advanced
========================

First, we should install the forklift accessories.
Click :ref:`here <forklift_assembly>` to jump to the Forklift Assembly section in Car_Assembly.

.. figure:: ./img/铲车.jpg
   :align: center
   :width: 90%


1.  Integrated Demo_V1
--------------
Effect: Based on our previous lessons, the vehicle utilizes various sensors and control methods to create an integrated demonstration program that showcases the vehicle's multiple functions. (Includes customizable music for instruction)

Effect demonstration:

.. figure:: ./img/集成演示V1G.gif
   :align: center
   :width: 85%

makecode program link: `https://makecode.microbit.org/S81815-15231-85946-91749 <https://makecode.microbit.org/S81815-15231-85946-91749/>`_


Screenshot of makecode graphical interface:

.. figure:: ./img/集成演示V1C1.png
   :align: center
   :width: 85%


.. figure:: ./img/集成演示V1C2.png
   :align: center
   :width: 85%


.. figure:: ./img/集成演示V1C3.png
   :align: center
   :width: 85%


.. figure:: ./img/集成演示V1C4.png
   :align: center
   :width: 85%
   

.. figure:: ./img/集成演示V1C5.png
   :align: center
   :width: 85%


.. figure:: ./img/集成演示V1C6.png
   :align: center
   :width: 85%


.. figure:: ./img/集成演示V1C7.png
   :align: center
   :width: 85%


**Code analysis:**

* ``on start`` shows an icon once. The main demonstration is one long sequence inside ``forever``, so it starts again after reaching the bottom.
* At the beginning of the sequence, the SG90 servo at S1 goes to 0 degrees and the car moves forward at speed 125.
* The program changes the colored searchlights and WS2812 RGB lights while it plays the notes shown in the blocks. The ``until done`` setting means each note finishes before the next block runs.
* During the sequence, the car also moves backward, rotates left, and rotates right. These later movement blocks use speed 255.
* The SG90 servo at S1 is moved to 0, 90, and 180 degrees at different points in the sequence.
* At the end, the car stops, the colored searchlights are turned off, the WS2812 RGB lights are turned off, and the SG90 servo at S1 returns to 90 degrees. Then the demonstration repeats.

13.  Infrared Remote Control
--------------
Effect: The infrared receiver at the front of the Smart Car board receives signals from the infrared remote control. Its buttons can control the car's direction and speed.

Effect demonstration:

.. figure:: ./img/红外遥控G.gif
   :align: center
   :width: 85%

makecode program link: `https://makecode.microbit.org/S97076-50786-20847-48807 <https://makecode.microbit.org/S97076-50786-20847-48807/>`_


Screenshot of makecode graphical interface:

.. figure:: ./img/红外遥控C1.png
   :align: center
   :width: 85%

.. figure:: ./img/红外遥控C2.png
   :align: center
   :width: 85%

.. figure:: ./img/红外遥控C3.png
   :align: center
   :width: 85%

**Code analysis:**

* At the start, the infrared receiver is connected to pin P8. The SG90 servo at S1 and the variable ``a`` are both set to 90.
* Pressing ``OK`` stops the car. ``Up`` moves forward at speed 100 for 200 milliseconds and then stops; ``Down`` does the same in reverse.
* ``LEFT`` and ``RIGHT`` rotate the car at speed 100 for 150 milliseconds and then stop. ``NUM1`` and ``NUM3`` also start left and right rotation, but their blocks do not include a pause or a stop.
* ``NUM4`` sets the WS2812 RGB lights to violet, while ``NUM6`` turns the RGB lights off. ``NUM7`` sets the colored searchlights to white, while ``NUM9`` turns them off.
* ``NUM2`` subtracts 15 from ``a`` and ``NUM8`` adds 15. The checks keep ``a`` between 0 and 180, and the SG90 servo at S1 moves to the new angle.
* ``STAR`` subtracts 180 and moves S1 to 0 degrees. ``GRID`` adds 180 and moves S1 to 180 degrees. The same 0-to-180 limits are applied.
* ``NUM5`` plays the built-in ``baddy`` melody on the passive buzzer. ``NUM0`` shows ``0`` for 100 milliseconds and then clears the micro:bit LED display.
