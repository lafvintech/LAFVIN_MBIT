.. _block_reference:

Block Reference
===============

This chapter explains the blocks added by version 1.0.1 of the
**LA_MBitCar** MakeCode extension. Use it to understand what each block does,
what its options mean, and where it fits in a program.

The block images have intentionally been left as placeholders. They should be
captured directly from MakeCode after importing the LAFVIN extension, so the
labels, drop-down menus, colors, and block shapes match the current extension
exactly.

How to Read a Block
-------------------

White number fields
   Click the number and enter a new value. The valid range is described under
   the corresponding block.

Drop-down fields
   Click the arrow to choose one of the options supplied by the extension.

Command blocks
   Perform an action, such as moving a motor or changing a light.

Reporter blocks
   Supply a value to another block. They have rounded ends. The ultrasonic
   block, for example, reports a distance.

Boolean blocks
   Report either ``true`` or ``false``. Their pointed shape fits into an
   ``if`` condition. The line-sensor block is a Boolean block.

Event blocks
   Run the blocks placed inside them when a selected event occurs.

1. Car Control
--------------

The extension provides three car-control blocks.

Car_Ctrl [direction]
~~~~~~~~~~~~~~~~~~~~

Moves the car using the extension's maximum speed setting. This block is
convenient for a quick test, but the speed-adjustable block gives safer and
more predictable control.

Car_Ctrl [direction] speed [0..255]
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Moves the car using one speed value for both motors.

``direction``
   Choose ``Forward``, ``Backward``, ``Left``, ``Right``, ``Rotate Left``,
   ``Rotate Right``, or ``Stop``.

``speed``
   Accepts a value from ``0`` to ``255``. ``0`` gives no drive and ``255`` is
   the maximum block value.

Car_Ctrl [direction] Lmotor [0..255] Rmotor [0..255]
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Sets the left and right motor speeds separately. Use it to correct a car that
drifts to one side, or to create a curved path by running one wheel more
slowly than the other.

.. BLOCK IMAGE PLACEHOLDER
   Suggested file: block_reference/img/car-control-options.png
   Capture from MakeCode:
   - all three Car_Ctrl block variants
   - the direction menu expanded
   - the complete Forward, Backward, Left, Right, Rotate Left,
     Rotate Right, and Stop option list
   After adding the file, replace this comment with:
   .. image:: ./block_reference/img/car-control-options.png
      :align: center
      :width: 85%
      :alt: Car control blocks and direction options

How the direction options move the wheels:

* ``Forward``: both wheels move forward.
* ``Backward``: both wheels move backward.
* ``Left``: the left wheel stops and the right wheel moves forward.
* ``Right``: the right wheel stops and the left wheel moves forward.
* ``Rotate Left``: the left wheel moves backward and the right wheel moves
  forward.
* ``Rotate Right``: the left wheel moves forward and the right wheel moves
  backward.
* ``Stop``: both motors stop.

.. tip::

   Start with a low speed and lift the driving wheels off the table during the
   first test.

2. Front Searchlights
---------------------

The two RGB searchlights at the front of the car are controlled together.

Searchlights Colors [color]
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Selects one preset color. The available options are ``Off``, ``Red``,
``Green``, ``Blue``, ``White``, ``Cyan``, ``Pinkish``, and ``Yellow``.

Searchlights Red [0..255] Green [0..255] Blue [0..255]
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Mixes a custom color. Each channel accepts a value from ``0`` to ``255``:

* ``255, 0, 0`` produces red.
* ``0, 255, 0`` produces green.
* ``0, 0, 255`` produces blue.
* ``255, 255, 0`` mixes yellow.
* ``0, 255, 255`` mixes cyan.
* ``255, 255, 255`` mixes white.

.. BLOCK IMAGE PLACEHOLDER
   Suggested file: block_reference/img/searchlight-options.png
   Capture from MakeCode:
   - the preset-color block
   - the custom RGB block
   - the complete preset color menu expanded
   After adding the file, replace this comment with:
   .. image:: ./block_reference/img/searchlight-options.png
      :align: center
      :width: 80%
      :alt: Searchlight blocks and color options

3. Bottom RGB Lights
--------------------

RGB Lights
~~~~~~~~~~

This reporter represents the strip of four WS2812 RGB LEDs under the car. The
LED indexes are ``0``, ``1``, ``2``, and ``3``.

Insert ``RGB Lights`` into blocks from the **Neopixel** category:

* Use ``set pixel color at`` to prepare a color for one numbered LED.
* Use ``set brightness`` to change the brightness of the whole strip.
* Use ``show`` to send the prepared color values to the real LEDs.
* Use ``clear`` followed by ``show`` to turn all four LEDs off.

.. note::

   Setting a pixel color does not always update the physical LEDs
   immediately. Add ``show`` after the changes that should become visible.

.. BLOCK IMAGE PLACEHOLDER
   Suggested file: block_reference/img/rgb-lights.png
   Capture from MakeCode:
   - the RGB Lights reporter by itself
   - the reporter inserted into set pixel color at
   - the reporter inserted into show
   After adding the file, replace this comment with:
   .. image:: ./block_reference/img/rgb-lights.png
      :align: center
      :width: 85%
      :alt: RGB Lights reporter used with Neopixel blocks

4. Music
--------

Music [melody]
~~~~~~~~~~~~~~

Plays one selected MakeCode built-in melody once.

The menu contains ``dadadum``, ``entertainer``, ``prelude``, ``ode``,
``nyan``, ``ringtone``, ``funk``, ``blues``, ``birthday``, ``wedding``,
``funereal``, ``punchline``, ``baddy``, ``chase``, ``ba_ding``,
``wawawawaa``, ``jump_up``, ``jump_down``, ``power_up``, and
``power_down``.

If the program runs but no sound is produced, check the audio switch on the
car board.

.. BLOCK IMAGE PLACEHOLDER
   Suggested file: block_reference/img/music-options.png
   Capture the Music block with the complete melody menu expanded.
   After adding the file, replace this comment with:
   .. image:: ./block_reference/img/music-options.png
      :align: center
      :width: 70%
      :alt: Music block and melody options

5. Servo
--------

Servo num [S1|S2|S3] Angle [0..180]
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Moves a connected servo toward the requested angle.

``num``
   Selects servo socket ``S1``, ``S2``, or ``S3``.

``Angle``
   Accepts a target angle from ``0`` to ``180`` degrees.

.. warning::

   The safe movement range depends on the assembly. Stop if the servo buzzes,
   shakes, or pushes against a physical limit. Switch off the car and choose
   a smaller angle range before trying again.

.. BLOCK IMAGE PLACEHOLDER
   Suggested file: block_reference/img/servo-options.png
   Capture the Servo block with the S1, S2, and S3 menu expanded.
   After adding the file, replace this comment with:
   .. image:: ./block_reference/img/servo-options.png
      :align: center
      :width: 70%
      :alt: Servo block and socket options

6. Line Sensors
---------------

Line_Sensor direct [position] Detection [surface]
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Reports ``true`` when the selected sensor detects the selected surface state.

``direct``
   Selects ``LeftState`` or ``RightState``.

``Detection``
   Selects ``White`` or ``Black``.

Because this is a Boolean block, place it inside ``if``, ``else if``, ``and``,
``or``, or another Logic block. A line-following program normally reads both
sensors repeatedly inside ``forever``.

.. BLOCK IMAGE PLACEHOLDER
   Suggested file: block_reference/img/line-sensor-options.png
   Capture the Line_Sensor block twice:
   - with the position menu expanded
   - with the White and Black detection menu expanded
   After adding the file, replace this comment with:
   .. image:: ./block_reference/img/line-sensor-options.png
      :align: center
      :width: 80%
      :alt: Line sensor block and detection options

.. tip::

   Test the returned values on the actual track before driving quickly.
   Strong sunlight, floor color, sensor height, and potentiometer adjustment
   can change the result.

7. Ultrasonic Distance
----------------------

ultrasonic return distance (cm)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Sends an ultrasonic trigger pulse on P14, reads the echo on P15, and reports
the calculated distance in centimeters.

The reporter can be:

* placed inside ``show number``;
* saved in a variable; or
* compared with a distance threshold inside an ``if`` condition.

A result of ``0`` normally means that no usable echo was received. Check the
module and its connection, and exclude ``0`` before applying an obstacle
threshold.

.. BLOCK IMAGE PLACEHOLDER
   Suggested file: block_reference/img/ultrasonic-distance.png
   Capture the ultrasonic reporter by itself and inserted into show number.
   After adding the file, replace this comment with:
   .. image:: ./block_reference/img/ultrasonic-distance.png
      :align: center
      :width: 75%
      :alt: Ultrasonic distance reporter

.. important::

   Install the ultrasonic module in the ultrasonic form described in the
   assembly chapter. The forklift and ultrasonic accessories share mounting
   space and are not installed there at the same time.

8. Infrared Remote Control
--------------------------

Connect IR receiver at pin [pin]
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Prepares the infrared receiver. For this car, select ``P8`` and place the
block inside ``on start`` before using the infrared events.

On IR button [button] [pressed|released]
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Runs the enclosed commands when the selected remote button changes to the
chosen state.

``button``
   Selects ``any``, ``Up``, ``Down``, ``LEFT``, ``RIGHT``, ``OK``, the
   number buttons, ``STAR``, or ``GRID``.

``action``
   Selects ``pressed`` or ``released``.

IR button code [button]
~~~~~~~~~~~~~~~~~~~~~~~

Reports the numeric NEC command code for the selected button. Most beginner
programs can use the event block directly and do not need this reporter.

.. BLOCK IMAGE PLACEHOLDER
   Suggested file: block_reference/img/infrared-options.png
   Capture from MakeCode:
   - Connect IR receiver with P8 selected
   - On IR button with the complete button menu expanded
   - the pressed and released menu
   - IR button code
   After adding the file, replace this comment with:
   .. image:: ./block_reference/img/infrared-options.png
      :align: center
      :width: 85%
      :alt: Infrared setup, event, and button code blocks

Point the remote toward the receiver. Strong sunlight, a long distance, or an
obstacle between them can make the signal unreliable.

Next Step
---------

Continue to :doc:`Programming Examples <Upload Code/Programming Examples>` to
see complete programs built with these blocks.
