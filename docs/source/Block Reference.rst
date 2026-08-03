.. _block_reference:

LAFVIN Extension Blocks
=======================

The **LA_MBitCar** blocks help your micro:bit control the smart car.
You can make the car move, light up, play music, and read sensors.

.. important::

   These blocks are **not included in a new MakeCode project**. They appear
   only after you add the LAFVIN car extension. For blocks that are already
   built into MakeCode, see :doc:`MakeCode Built-in Blocks`.

Before You Start
----------------

* Find an **outlined field** with a down arrow.
* Click it to open the menu shown under the block.
* Click a **white number** to change its value.


1. Make the Car Move
--------------------

.. figure:: ./block_reference/img/car-control.png
   :align: center
   :width: 50%
   :alt: Car control block with its direction menu open

   Click ``Forward`` to open all seven direction choices.

Choose a direction:

* ``Forward`` or ``Backward`` moves the car straight.
* ``Left`` or ``Right`` makes a turn.
* ``Rotate Left`` or ``Rotate Right`` spins the car.
* ``Stop`` stops both wheels.

Speed can be set from ``0`` to ``255``. This is the motor's **PWM duty-cycle
setting**, not the car's real travelling speed: ``0`` is 0% duty cycle and
``255`` is approximately 100% duty cycle. The same setting can still produce
different real speeds on different surfaces or with a different battery level
or load.

Control the car at the default speed
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. figure:: ./block_reference/img/car-default-speed-options.svg
   :align: center
   :width: 50%
   :alt: Car control block without a speed input, with its direction menu open

   Click ``Stop`` to open all seven direction choices.

This ``Car_Ctrl`` block has no speed input. It controls Forward, Backward,
Left, Right, Rotate Left, and Rotate Right at the extension's default motor
speed. Choose ``Stop`` to stop the car. Use the ``Car_Ctrl ... speed`` block
above when you need to choose a specific speed.

Set the left and right motor speeds separately
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

``Car_Ctrl <direction> Lmotor <left speed> Rmotor <right speed>`` is the
third car-control block in the extension. Its direction menu has the same
seven choices shown above. Set each N20-motor speed from ``0`` to ``255``.
Use it when the car needs different left and right speeds, for example to
correct a gentle drift. For ``Left`` and ``Right``, the extension stops the
inside motor; for ``Stop``, both motor speeds are ignored and the car stops.

.. figure:: ./block_reference/img/car-dual-speed-options.svg
   :align: center
   :width: 72%
   :alt: Car control block with separate Lmotor and Rmotor speeds and its direction menu open

   Click ``Forward`` to choose a direction. The two white numbers set the
   left and right N20-motor speeds separately.



2. Change the Colored Searchlights
----------------------------------

.. figure:: ./block_reference/img/searchlights.png
   :align: center
   :width: 44%
   :alt: Searchlight block with its color menu open

   Click ``Off`` to open all eight colored-searchlight choices.

Choose ``Red``, ``Green``, ``Blue``, ``White``, ``Cyan``, ``Pinkish``,
``Yellow``, or ``Off``.

The two colored searchlights are controlled together: one block sets both
lights to the same color. They cannot be set to different colors separately.

Set a custom searchlight color
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

``Searchlights Red <red> Green <green> Blue <blue>`` is the second
searchlight block in the extension. Enter a value from ``0`` to ``255`` for
each color channel. A larger value makes that color brighter. This block lets
you mix one color for both searchlights that is not in the preset color menu
above.



3. NeoPixel Blocks for the WS2812 RGB Lights
--------------------------------------------

The programming examples use the following NeoPixel blocks to control the
four WS2812 RGB lights under the Smart Car board.

Select the four WS2812 RGB lights
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. figure:: ./block_reference/img/rgb-lights-device.png
   :align: center
   :width: 22%
   :alt: RGB Lights value block

The red ``RGB Lights`` value block represents the four WS2812 RGB lights under
the Smart Car board. Its rounded shape fits into the red socket of each
NeoPixel action block below.

Set one light's color
~~~~~~~~~~~~~~~~~~~~~

.. figure:: ./block_reference/img/rgb-lights-basic.png
   :align: center
   :width: 68%
   :alt: RGB light block with its color menu open

   Click the color field to open all ten color choices.

The four WS2812 RGB lights under the Smart Car board are numbered ``0``, ``1``,
``2``, and ``3``.
Choose a number to change one light. The color menu contains ``red``,
``orange``, ``yellow``, ``green``, ``blue``, ``indigo``, ``violet``,
``purple``, ``white``, and ``black``. Choose ``black`` when you want that
light to be off.

This block changes a stored color. Use ``show`` to send that change to the
real lights.

Show the stored colors
~~~~~~~~~~~~~~~~~~~~~~

.. figure:: ./block_reference/img/neopixel-show.png
   :align: center
   :width: 34%
   :alt: RGB Lights show block

``show`` sends all stored pixel colors to the four WS2812 RGB lights. Use it after one
or more ``set pixel color`` blocks.

Show one color on all four lights
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. figure:: ./block_reference/img/neopixel-show-color.png
   :align: center
   :width: 54%
   :alt: RGB Lights show color block

``show color`` changes all four WS2812 RGB lights at once and displays the selected
color immediately. Its color field provides the same ten choices shown in
the ``set pixel color`` menu.

Change the brightness
~~~~~~~~~~~~~~~~~~~~~

.. figure:: ./block_reference/img/neopixel-brightness.png
   :align: center
   :width: 54%
   :alt: RGB Lights set brightness block

``set brightness`` controls how bright the WS2812 RGB lights appear. Use a value
from ``0`` for off to ``255`` for maximum brightness.

Clear the stored colors
~~~~~~~~~~~~~~~~~~~~~~~

.. figure:: ./block_reference/img/neopixel-clear.png
   :align: center
   :width: 34%
   :alt: RGB Lights clear block

``clear`` changes every stored pixel color to black. Use ``show`` afterward
when the cleared result must be sent to WS2812 RGB lights that are already on.

4. Play Music
-------------

.. figure:: ./block_reference/img/music.png
   :align: center
   :width: 32%
   :alt: Music block with its melody menu open

   Click ``dadadum`` to see every built-in melody.

Choose a melody, and the car plays it once.

If you cannot hear anything, check the audio switch on the Smart Car board and
make sure the passive buzzer is enabled.

5. Control the SG90 Servo
-------------------------

.. figure:: ./block_reference/img/servo.png
   :align: center
   :width: 52%
   :alt: Servo block with its socket menu open

   Click ``S1`` to choose a position on the servo interface.

Choose ``S1``, ``S2``, or ``S3`` to match the servo-interface position used by
the SG90 servo.
The angle can be from ``0`` to ``180`` degrees.


6. Read the Line-following Sensors
----------------------------------

.. figure:: ./block_reference/img/line-direction.png
   :align: center
   :width: 72%
   :alt: Choose the left or right line-following sensor

   First click ``LeftState`` to choose the left or right line-following sensor.

.. figure:: ./block_reference/img/line-surface.png
   :align: center
   :width: 72%
   :alt: Choose a white or black surface

   Then click ``White`` to choose whether to check for a white or black
   surface.

The two line-following sensors face the ground on the bottom of the Smart Car
board. When the car faces forward, ``LeftState`` means the left sensor and
``RightState`` means the right sensor.

Read the block as a question. For example, ``Line_Sensor direct LeftState
Detection White`` asks: “Is the left sensor over the white ground now?” The
answer is **true** for yes and **false** for no. If you choose ``Black``, the
same block asks whether that sensor is over the black line instead.

In the line-tracking example, the program checks both sensors again and again:

* Left white and right white: drive forward.
* Left white and right black: turn right to find the line again.
* Left black and right white: turn left to find the line again.
* Both black: stop.

Put these yes/no blocks inside ``if`` blocks so the Smart Car can choose its
next movement from what the two sensors see.

7. Measure Distance with the HC-SR04 Ultrasonic Module
-------------------------------------------------------

.. figure:: ./block_reference/img/ultrasonic.png
   :align: center
   :width: 52%
   :alt: Ultrasonic distance block

   This block reports the distance in centimeters.

Put it inside ``show number`` to see the HC-SR04 ultrasonic-module distance on
the micro:bit display.
You can also compare the distance with a number to help the car avoid an
obstacle.

A result of ``0`` usually means that the HC-SR04 ultrasonic module did not
receive a clear echo.

8. Use the Remote Control
-------------------------

Connect the infrared receiver
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. figure:: ./block_reference/img/ir-connect.png
   :align: center
   :width: 48%
   :alt: Connect IR receiver at pin P8 block

Put ``Connect IR receiver at pin P8`` inside ``on start`` so the micro:bit
begins listening for remote-control signals. The infrared receiver on this
Smart Car board is connected to pin ``P8``.

Choose a remote button
~~~~~~~~~~~~~~~~~~~~~~

.. figure:: ./block_reference/img/ir-button.png
   :align: center
   :width: 46%
   :alt: Infrared remote button choices

   Click ``OK`` to see every button on the remote.

.. figure:: ./block_reference/img/ir-action.png
   :align: center
   :width: 48%
   :alt: Infrared button action choices

   Click ``pressed`` to choose ``pressed`` or ``released``.

Add an ``On IR button`` event:

#. Choose a remote button.
#. Choose ``pressed`` or ``released``.
#. Put a car, light, music, or servo block inside the event.

Point the infrared remote control toward the infrared receiver when you test it.

Continue to :doc:`Programming Examples <Upload Code/Programming Examples>` when
you are ready to combine several blocks.
